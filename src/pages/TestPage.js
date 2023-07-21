
const TestPage = () => {

    const docs = [
        { uri: "http://localhost:8000/uploads/test.pdf" },
    ];

    return (
        <>
            <embed
                src="http://localhost:8000/uploads/test.pdf"
                style={{
                    width: '100%',
                    height: '700px'
                }}
                type="application/pdf"
            />
        </>
    );
}

export default TestPage;