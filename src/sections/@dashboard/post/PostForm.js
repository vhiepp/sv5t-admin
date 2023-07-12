import { Alert, Button, Card, Container, FormControlLabel, LinearProgress, Stack, TextField } from "@mui/material"
import { isUndefined } from "lodash"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Editor from "src/components/ckeditor5"
import FilePondImage from "src/components/filepond/filepondimage"
import IOSSwitch from "src/components/switch/IOSSwitch"
import { useStateContext } from "src/contexts/ContextProvider"

export default function PostForm({ name, direct, submitUrl, ...props }) {
    const [title, setTitle] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [postNow, setPostNow] = useState(true);
    const [reRender, setReRender] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { axiosApi } = useStateContext();
    const validate = useRef({
        title: {
            err: false,
            msg: "Tiêu đề không được bỏ trống!"
        },
        thumbnail: {
            err: false,
            msg: `Vui lòng chọn ảnh nền ${name}!`
        },
        content: {
            err: false,
            msg: "Hãy viết gì đó!"
        }
    });
    useEffect(() => {
        if (!isUndefined(props.slug)) {
            axiosApi.post('/post', { slug: props.slug })
                .then(({ data }) => {
                    const { title, content, thumb, description } = data;
                    setTitle(title);
                    setContent(content);
                    setDescription(description);
                    setThumbnailUrl(thumb);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, [])

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
        if (data !== '') {
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
        if (data !== '') {
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

        axiosApi.post(submitUrl, {
            thumbnail: thumbnailUrl,
            title,
            description,
            content,
            postNow,
            slug: !isUndefined(props.slug) ? props.slug : null,
        })
            .then(({ data }) => {
                // handle the response
                console.log(data);
                setLoading(false);

                if (data.status === 'success') {
                    navigate(direct);
                }

            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }

    return (
        <Card>
            <Container>
                <Stack my={5}>
                    <TextField
                        error={validate.current.title.err}
                        helperText={validate.current.title.err ? validate.current.title.msg : ''}
                        id="standard-basic"
                        label={`Tiêu đề ${name}`}
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
                    <Button variant="outlined" disabled={loading} onClick={handleFormSubmit}>Đăng</Button>
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
    )
}