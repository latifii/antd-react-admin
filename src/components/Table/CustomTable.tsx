import React from 'react';
import { Table, TableProps } from 'antd';
import TableSkeleton from './TableSkeleton';
import { noData } from '../../utils/helpers';

type ConditionalPaginationProps =
  {
    pageExist?: true;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  } | {
    pageExist: false;
    setPageSize?: undefined;
    setCurrentPage?: undefined;
  };

type CustomTableProps<T> = {
  columns: TableProps<T>['columns'];
  dataSource: T[];
  loading: boolean;
  totalData?: number;
  currentPage?: number;
  pageSize?: number;
} & Omit<TableProps<T>, 'columns' | 'dataSource'> &
  ConditionalPaginationProps;

export default function CustomTable<T extends { id: React.Key }>(
  props: CustomTableProps<T>
): React.ReactElement {
  const {
    columns,
    dataSource,
    scroll = { x: 1000, y: 6 * 49 },
    rowKey = 'id',
    expandable,
    loading,
    pageExist = true,
    totalData = 0,
    currentPage = 1,
    setCurrentPage,
    pageSize = 10,
    setPageSize,
    rowSelection,
    ...rest
  } = props;

  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <Table<T>
          columns={
            expandable
              ? columns
              : columns?.map((col) => ({
                ...col,
                render: col.render || ((value) => noData(value))
              }))
          }
          size="small"
          scroll={scroll}
          dataSource={dataSource}
          rowKey={rowKey}
          pagination={
            pageExist
              ? {
                position: ['bottomRight'],
                showSizeChanger: true,
                current: currentPage,
                total: totalData,
                responsive: true,
                pageSize,
                rootClassName: "!mr-4",
                size: "default",
                onChange: (page, size) => {
                  setPageSize?.(size);
                  setCurrentPage?.(page);
                },
              }
              : false
          }
          expandable={expandable}
          rowSelection={rowSelection}
          {...rest}
        />
      )}
    </>
  );
}
