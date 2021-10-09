/* eslint-disable react-hooks/exhaustive-deps */
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Theme,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  LinearProgress,
} from "@mui/material";

import { createStyles, makeStyles } from "@mui/styles";

import React, { useCallback, useEffect } from "react";
import { debounce } from "lodash";

export interface IDataTableColumn {
  id: string;
  name: string;
  enableSort?: boolean;
  align?: "center" | "inherit" | "justify" | "left" | "right";
  action?: (item: any) => JSX.Element;
}

interface IDataTableHeadProps {
  columns: IDataTableColumn[];
  order: Order;
  orderBy: keyof any;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof any
  ) => void;
}
interface IDataTableProps {
  rows: any[];
  columnData: IDataTableColumn[];
  onChange: (qs: string) => void;
  total: number;
  loading: boolean;
}

type Order = "asc" | "desc";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: 16,
    },
    table: {
      minWidth: 750,
      tableLayout: "fixed",
      "& .MuiTableCell-head": {
        textTransform: "capitalize",
        fontWeight: "bold",
      },
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

const DataTableHead: React.FC<IDataTableHeadProps> = ({
  columns,
  order,
  orderBy,
  onRequestSort,
}): JSX.Element => {
  console.log(columns);
  const createSortHandler =
    (property: keyof any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <React.Fragment>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.id}
              align="left"
              sortDirection={orderBy === column.id ? order : false}
            >
              {column.enableSort ? (
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "asc"}
                  onClick={createSortHandler(column.id)}
                >
                  {column.name}
                </TableSortLabel>
              ) : (
                column.name
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </React.Fragment>
  );
};

const DataTable: React.FC<IDataTableProps> = ({
  columnData,
  rows,
  onChange,
  total,
  loading,
}): JSX.Element => {
  console.log(columnData, rows);

  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof any>("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");

  const debounceValue = debounce((value) => {
    console.log(value);
  }, 1000);

  const debouceRequest = useCallback((value: any) => debounceValue(value), []);

  const handleSeachChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    debouceRequest(e.target.value);
    setSearch(e.target.value);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof any
  ) => {
    console.log(orderBy, property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    let qs = "?";
    if (order && orderBy) {
      if (order === "asc") {
        qs += `&ordering=${String(orderBy)}`;
      } else if (order === "desc") {
        qs += `&ordering=-${String(orderBy)}`;
      }
      // qs += `&_sort=${String(orderBy)}&_order=${order}`;
    }
    if (page) {
      let _page = page + 1; //we add one bcoz mui pagination starts with zero
      qs += `&page=${_page}`;
      // qs += `&_page=${_page}`;
    }

    if (rowsPerPage) {
      qs += `&page_size=${rowsPerPage}`;
      // qs += `&_limit=${rowsPerPage}`;
    }

    if (search) {
      qs += `&search=${search}`;
      // qs += `&q=${search}`;
    }

    onChange(qs);
  }, [order, orderBy, page, rowsPerPage, search]);

  //   const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div style={{ padding: 8 }}>
            <TextField
              placeholder="Search"
              value={search}
              onChange={handleSeachChange}
              size="small"
              fullWidth
            />
          </div>
          {loading && <LinearProgress />}
          <TableContainer>
            <Table aria-labelledby="tableTitle" aria-label="enhanced table">
              <DataTableHead
                columns={columnData}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {rows.map((row) => {
                  console.log(row);
                  return (
                    <TableRow>
                      {columnData.map((col) => {
                        if (col.action) {
                          return (
                            <TableCell align={col.align}>
                              {col.action(row)}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell align={col.align}>{row[col.id]}</TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
                {/* {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            count={total}
            onPageChange={handleChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[1, 5, 10, 25]}
          />
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default DataTable;
