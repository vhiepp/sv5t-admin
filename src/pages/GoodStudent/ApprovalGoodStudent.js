import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  NativeSelect,
  Stack,
  Typography,
} from "@mui/material";
import "dayjs/locale/en-gb";
import { viVN } from "@mui/x-date-pickers/locales";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import Iconify from "src/components/iconify/Iconify";
import { useStateContext } from "src/contexts/ContextProvider";
import dayjs from "dayjs";
import ApprovalList from "src/sections/@dashboard/approval/ApprovalList";

const today = dayjs();

const ApprovalGoodStudent = () => {
  const [openDialogAddNewApproval, setOpenDialogAddNewApproval] = useState(false);
  const [dateStartNewApproval, setDateStartNewApproval] = useState(today);
  const [dateEndNewApproval, setDateEndNewApproval] = useState();
  const [listApprovals, setListApprovals] = useState([]);
  const [errDate, setErrDate] = useState("");
  const [approvalValue, setApprovalValue] = useState(null);
  const [isOpenApproval, setIsOpenApproval] = useState(false);
  const { axiosApi } = useStateContext();

  useEffect(() => {
    handleGetApprovalList();
    // handleGetApprovalRequestList();
  }, []);

  const handleGetApprovalList = () => {
    axiosApi.post("/admin/approval/get").then(({ data }) => {
      const approvals = data.data;
      approvals.forEach(a => {
        if (a.status == 'happenning' || a.status == 'upcoming') {
          setIsOpenApproval(true);
        }
      });
      setListApprovals(approvals);
      setApprovalValue(approvals[0].id);  
    });
  };

  const handleOpenDialogAddNewApproval = () => {
    setOpenDialogAddNewApproval(true);
  };
  
  const handleCloseDialogAddNewApproval = () => {
    setOpenDialogAddNewApproval(false);
    setDateStartNewApproval(today);
    setDateEndNewApproval(null);
  };

  const handleChangeFormDateStart = (e) => {
    setDateStartNewApproval(e);
  };

  const handleChangeFormDateEnd = (e) => {
    setDateEndNewApproval(e);
  };

  const handleApprovalValue = (e) => {
    setApprovalValue(e.target.value);
  };

  const errMsg = useMemo(() => {
    switch (errDate) {
      case "maxDate":
      case "minDate": {
        return "Ngày kết thúc phải lớn hơn ngày bắt đầu!";
      }
      case "invalidDate": {
        return "Định dạng ngày không hợp lệ";
      }
      default: {
        return "";
      }
    }
  }, [errDate]);

  const handleSubmitNewApproval = () => {
    if (dateStartNewApproval && dateEndNewApproval && errMsg === "") {
      axiosApi
        .post("/admin/approval/create", {
          dateStart: dateStartNewApproval.$d,
          dateEnd: dateEndNewApproval.$d,
        })
        .then((res) => {
          handleGetApprovalList();
          handleCloseDialogAddNewApproval();
        });
    }
  };

  return (
    <>
      <Helmet>
        <title> Xét Sinh Viên 5 tốt | Sinh viên 5 tốt TVU </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Xét SV5T
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Đợt xét SV5T
              </InputLabel>
              {listApprovals.length > 0 && (
                <NativeSelect
                  value={approvalValue}
                  inputProps={{
                    name: "approval",
                    id: "uncontrolled-native",
                  }}
                  onChange={handleApprovalValue}
                >
                  {listApprovals.length > 0 &&
                    listApprovals.map((approval, index) => (
                      <option value={approval.id} key={approval.id}>
                        Ngày {approval.date_start} đến ngày {approval.date_end} ({approval.status_description})
                      </option>
                    ))}
                </NativeSelect>
              )}
            </FormControl>
          </Box>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenDialogAddNewApproval}
            disabled={isOpenApproval}
          >
            Tạo
          </Button>
        </Stack>

        {approvalValue && <ApprovalList approvalId={approvalValue} />}
      </Container>
      <Dialog fullWidth={true} maxWidth="xs" open={openDialogAddNewApproval} onClose={handleCloseDialogAddNewApproval}>
        <DialogTitle>Mở thời gian đăng kí xét duyệt SV5T mới</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <small>
              <i>
                Hãy chọn thời gian để mở cuộc xét duyệt Sinh viên 5 tốt mới, sau khi mở các bạn sinh viên có thể vào
                đăng kí và nộp minh chứng.
              </i>
            </small>
          </DialogContentText>
          <Stack my={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
              <DatePicker
                sx={{ minWidth: "100%" }}
                label="Ngày bắt đầu"
                defaultValue={dateStartNewApproval}
                minDate={today}
                maxDate={
                  dateEndNewApproval
                    ? dayjs(dateEndNewApproval).add(-1, "day")
                    : dayjs(dateEndNewApproval).add(100, "day")
                }
                onChange={handleChangeFormDateStart}
              />
            </LocalizationProvider>
          </Stack>
          <DialogContentText>
            <i>
              <b>đến</b>
            </i>
          </DialogContentText>
          <Stack my={2}>
            <LocalizationProvider
              localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <DatePicker
                sx={{ minWidth: "100%" }}
                label="Ngày kết thúc"
                minDate={dayjs(dateStartNewApproval).add(1, "day")}
                onChange={handleChangeFormDateEnd}
                onError={(newErr) => setErrDate(newErr)}
                slotProps={{
                  textField: {
                    helperText: errMsg,
                  },
                }}
              />
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmitNewApproval}
            disabled={!dateStartNewApproval || !dateEndNewApproval || errMsg !== ""}
          >
            Tạo ngay
          </Button>
          <Button onClick={handleCloseDialogAddNewApproval} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApprovalGoodStudent;
