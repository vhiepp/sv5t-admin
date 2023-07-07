import { Alert, Button, Card, Container, FormControlLabel, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { useRef, useState } from "react";
import Editor from "../../components/ckeditor5";
import IOSSwitch from "../../components/switch/IOSSwitch";
import FilePondImage from "../../components/filepond/filepondimage";

import api from "src/api";
import { useNavigate } from "react-router-dom";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

export default function NotificationCreate() {
    const [title, setTitle] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [postNow, setPostNow] = useState(true);
    const [reRender, setReRender] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const validate = useRef({
        title: {
            err: false,
            msg: "Tiêu đề không được bỏ trống!"
        },
        thumbnail: {
            err: false,
            msg: "Vui lòng chọn ảnh nền cho thông báo này!"
        },
        content: {
            err: false,
            msg: "Hãy viết gì đó!"
        }
    });

    const handleBack = () => {
        navigate(-1);
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
        if (e.target.value) {
            validate.current.title.err = false;
        } else {
            validate.current.title.err = true;
        }
    }

    const handleThumbnail = (data) => {
        setThumbnailUrl(data);
        if (data != '') {
            validate.current.thumbnail.err = false;
        } else {
            validate.current.thumbnail.err = true;
        }
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleContent = (data) => {
        setContent(data)
        if (data != '') {
            validate.current.content.err = false;
        } else {
            validate.current.content.err = true;
        }
    }

    const handlePostNowStatus = () => {
        setPostNow(!postNow);
    }

    const handleFormSubmit = () => {
        if (!title) {
            validate.current.title.err = true;
            return setReRender(!reRender);
        }
        if (!thumbnailUrl) {
            validate.current.thumbnail.err = true;
            return setReRender(!reRender);
        }
        if (!content) {
            validate.current.content.err = true;
            return setReRender(!reRender);
        }
        setLoading(true);
        api.post('admin/post/notification/create', {
            thumbnail: thumbnailUrl,
            title,
            description,
            content,
            postNow
        })
            .then(({ data }) => {
                // handle the response
                console.log(data);
                setLoading(false);
                navigate('/dashboard/thong-bao');

            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }

    return (
        <>
            <Helmet>
                <title> Tạo thông báo mới | Sinh viên 5 tốt TVU </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Button variant="contained" onClick={handleBack} startIcon={<ReplyOutlinedIcon />} >
                        Trở lại
                    </Button>
                    <Typography variant="h4" gutterBottom>
                        Tạo thông báo
                    </Typography>
                </Stack>

                <Card>
                    <Container>
                        <Stack my={5}>
                            <TextField
                                error={validate.current.title.err}
                                helperText={validate.current.title.err ? validate.current.title.msg : ''}
                                id="standard-basic"
                                label="Tiêu đề thông báo"
                                variant="standard"
                                value={title}
                                onChange={handleTitle}
                            />
                            <Stack my={4}>
                                <Container maxWidth="sm">
                                    <FilePondImage
                                        fileUrl={thumbnailUrl}
                                        onChange={(value) => { handleThumbnail(value) }}
                                    />
                                    {
                                        validate.current.thumbnail.err &&
                                        <Alert sx={{
                                            paddingTop: 0,
                                            paddingBottom: 0,
                                        }} severity="error">{validate.current.thumbnail.msg}</Alert>
                                    }
                                </Container>
                            </Stack>
                            <TextField
                                id="standard-multiline-static"
                                label="Mô tả/tóm tắt (nếu có)"
                                multiline
                                minRows={4}
                                value={description}
                                onChange={handleDescription}
                                variant="standard"
                            />
                            <Stack my={5}>
                                <Editor
                                    onChange={handleContent}
                                    value={content}
                                />
                                {
                                    validate.current.content.err &&
                                    <Alert sx={{
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                    }} severity="error">{validate.current.content.msg}</Alert>
                                }
                            </Stack>
                            <Stack mt={3} mb={5}>
                                <FormControlLabel
                                    defaultChecked={postNow}
                                    sx={{
                                        width: 150,
                                    }}
                                    onChange={handlePostNowStatus}
                                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                    label="Đăng ngay"
                                />
                            </Stack>
                            <Button variant="outlined" onClick={handleFormSubmit}>Tạo ngay</Button>
                            {
                                loading &&
                                <LinearProgress
                                    sx={{
                                        marginLeft: '3px',
                                        marginRight: '3px'
                                    }}
                                />
                            }
                        </Stack>
                    </Container>
                </Card>

            </Container >
        </>
    )
}