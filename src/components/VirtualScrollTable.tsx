import React, {Ref, forwardRef, useEffect, useRef, useState} from "react"
import {Table} from "antd"
import {TableProps} from "antd/lib/table/Table"
import {FormTableBox} from "../../components/styled"
import {useTableScroll} from "../../hooks"
import {createPortal} from "react-dom"
import {isNil} from "../../utils"

type IProps<T> = {
    scroll?: {x?: number | boolean}
    sumKeys?: string[]
    summaryData?: any
    scrollMaxHeight?: number
} & Omit<TableProps<T>, "scroll">

const baseRowHeight = 34
const headerHeight = 43
const buffer = 200

export default forwardRef((props: IProps<any>, ref: Ref<any>) => {
    const {
        dataSource = [],
        rowKey = "id",
        summaryData,
        scroll,
        columns = [],
        scrollMaxHeight,
        ...rest
    } = props
    const [renderData, setRenderData] = useState<any[]>(dataSource)
    const [footer, setFooter] = useState<any>(null)
    const sizes = useRef<any>({})
    const cache = useRef({
        top: 0,
        bottom: 0,
        start: 0,
        end: 0
    })
    const lastScrollTop = useRef(0)

    const {tableBoxSX, boxRef, maxHeight} = useTableScroll({disabled: !isNil(scrollMaxHeight)})

    useEffect(() => {
        setRenderData(dataSource)
    }, [dataSource.length])

    useEffect(() => {
        if (maxHeight || scrollMaxHeight) {
            handleScroll()
        }
    }, [maxHeight, scrollMaxHeight])

    useEffect(() => {
        if (summaryData && !footer) {
            let tFoot = document.querySelector(".virtual-table .ant-table-tfooter")
            if (!tFoot) {
                tFoot = document.createElement("tfoot")
                tFoot.className = "ant-table-tfooter"
                document
                    .querySelector(".virtual-table .ant-table-tbody")
                    ?.parentNode?.appendChild(tFoot)
                setFooter(tFoot)
            }
        }
    }, [summaryData])

    const getRecordKey = (record: any, index: number) => {
        if (!record) return undefined
        if (typeof rowKey === "function") {
            return rowKey(record, index)
        }
        return record[rowKey as string]
    }

    // 更新尺寸（高度）
    const updateSizes = () => {
        const rows = document.querySelectorAll(".virtual-table .ant-table-tbody .ant-table-row")
        let preOffsetTop = 0
        Array.from(rows).forEach((row: any, index: number) => {
            const _index = cache.current.start + index
            const key = getRecordKey(dataSource[_index], _index)
            if (!key) return
            const offsetHeight = row.offsetHeight
            const oldSize = sizes.current[key] ? sizes.current[key] : {}
            if (index === 0 && oldSize.offsetTop !== undefined) {
                preOffsetTop = oldSize.offsetTop
            }
            sizes.current[key] = {
                ...oldSize,
                size: offsetHeight,
                offsetTop: preOffsetTop
            }
            preOffsetTop += offsetHeight
        })
    }

    const getSize = (index: number) => {
        const row = dataSource[index]
        if (row) {
            const key = getRecordKey(row, index)
            const curSize = sizes.current[key]
            return curSize?.size || baseRowHeight
        }
        return baseRowHeight
    }

    const getOffsetTop = (index: number) => {
        const row = dataSource[index]
        if (row) {
            const key = getRecordKey(row, index)
            const curSize = sizes.current[key]
            return curSize?.offsetTop || 0
        }
        return 0
    }

    const calcRenderData = () => {
        const {scrollTop, offsetHeight} = boxRef.current
        // 计算可视范围顶部、底部
        const top = scrollTop - buffer + headerHeight
        const bottom = scrollTop + offsetHeight + buffer + headerHeight

        // 二分法计算可视范围内的开始的第一个内容
        let l = 0
        let r = dataSource.length - 1
        let mid = 0
        while (l <= r) {
            mid = Math.floor((l + r) / 2)
            const midVal = getOffsetTop(mid)
            if (midVal < top) {
                const midNextVal = getOffsetTop(mid + 1)
                if (midNextVal > top) break
                l = mid + 1
            } else {
                r = mid - 1
            }
        }

        // 计算渲染内容的开始、结束索引
        let start = mid
        let end = dataSource.length - 1
        for (let i = start + 1; i < dataSource.length; i++) {
            const offsetTop = getOffsetTop(i)
            if (offsetTop >= bottom) {
                end = i
                break
            }
        }

        cache.current = {top, bottom, start, end}
        setRenderData(dataSource.slice(start, end + 1))
    }

    const calcPosition = () => {
        const last = dataSource.length - 1
        // 计算内容总高度
        const wrapHeight =
            getOffsetTop(last) + getSize(last) + headerHeight + (footer ? footer.offsetHeight : 0)
        const contentEle: any = document.querySelector(".virtual-table .ant-table-content")
        if (contentEle) {
            contentEle.style.height = `${wrapHeight}px`
        }
        const tableBody: any = document.querySelector(".virtual-table .ant-table-body")
        const tableHeader: any = document.querySelector(
            ".virtual-table .ant-table-body .ant-table-thead"
        )
        const tableFooter: any = document.querySelector(
            ".virtual-table .ant-table-body .ant-table-tfooter"
        )
        if (tableBody) {
            // 计算当前滚动位置需要撑起的高度
            const offsetTop = getOffsetTop(cache.current.start)
            tableBody.style.transform = `translateY(${offsetTop}px)`
            tableHeader.style.top = `${-offsetTop}px`
            if (tableFooter) {
                tableFooter.style.bottom = `${offsetTop}px`
            }
        }
    }

    const handleScroll = () => {
        // 如果没有设置最大高度，则认为不需要虚拟滚动
        if (!boxHeight) return
        console.log("boxHeight")
        // 如果没有获取到boxRef，不需要虚拟滚动
        if (!boxRef.current) return
        const {scrollTop} = boxRef.current
        // 只执行上下滚动操作，禁止左右滚动操作
        if (lastScrollTop.current === scrollTop) return
        lastScrollTop.current = scrollTop
        // 更新当前尺寸（高度）
        updateSizes()
        // 计算renderData
        calcRenderData()
        // 计算位置
        calcPosition()
    }

    const boxHeight = scrollMaxHeight || maxHeight

    return (
        <FormTableBox
            ref={boxRef}
            sx={{
                ...tableBoxSX,
                maxHeight: boxHeight || "auto",
                "& .ant-table .ant-table-tfooter": {
                    position: "sticky",
                    bottom: 0
                },
                "& .ant-table .ant-table-row:last-child td": {
                    borderBottom: footer ? "1px solid #e9e9e9" : 0
                },
                "& .ant-table .ant-table-tfooter>tr>td": {
                    padding: "6px 8px",
                    background: "#fdf7e7",
                    textAlign: "center",
                    border: "1px solid #e9e9e9",
                    borderLeft: 0,
                    borderTop: 0
                }
            }}
            onScroll={handleScroll}
        >
            <Table
                bordered
                size="small"
                pagination={false}
                columns={columns}
                dataSource={renderData}
                className="virtual-table"
                rowKey={rowKey}
                {...rest}
            />
            <>
                {summaryData &&
                    footer &&
                    createPortal(
                        <tr>
                            {rest.rowSelection && <td />}
                            {columns.map((col) => {
                                const key = col!.dataIndex as string
                                return <td key={col.key || key}>{summaryData[key]}</td>
                            })}
                        </tr>,
                        footer
                    )}
            </>
        </FormTableBox>
    )
})
