import React, { useState } from "react";
import axios from "axios";

export default function Synonym() {
    const [fileData, setFileData] = useState([{ file: null, words: "" }]);
    const [email, setEmail] = useState("");
    const [value, setValue] = useState([]);

    const handleFileChange = (e, index) => {
        const newFileData = [...fileData];
        newFileData[index].file = e.target.files[0];
        setFileData(newFileData);
    };

    const handleWordChange = (e, index) => {
        const newFileData = [...fileData];
        newFileData[index].words = e.target.value;
        setFileData(newFileData);
    };

    const handleAddMore = () => {
        setFileData([...fileData, { file: null, words: "" }]);
    };

    const handleUpload = () => {
        const formDataArray = fileData.map(({ file, words }) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("email", email);
            formData.append("words", words);
            return formData;
        });

        Promise.all(
            formDataArray.map((formData) =>
                axios.post(
                    "https://filesenseamd64.onrender.com/api/v1/files/get/synonyms",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )
            )
        )
            .then((responses) => {
                const data = responses.map((res) => res.data.data);
                console.log(data);
                setValue(data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <input
                className="w-96 border p-2 mt-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <div>
                {fileData.map((fileObj, index) => (
                    <div key={index}>
                        <input
                            className="w-96 border p-2 mt-2"
                            type="text"
                            value={fileObj.words}
                            onChange={(e) => handleWordChange(e, index)}
                            placeholder="Enter the word"
                        />
                        <div className="file-input">
                            <input
                                type="file"
                                name="files"
                                accept=".txt, .docx, .doc, .pdf, .jpg, .jpeg, .png"
                                onChange={(e) => handleFileChange(e, index)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="border mr-3 p-2 mt-4 bg-black text-white rounded-xl"
                onClick={handleAddMore}
            >
                Add File
            </button>
            <button
                className="border ml-4 p-2 text-white bg-black rounded-xl"
                onClick={handleUpload}
            >
                Upload
            </button>

            {value.map((wordArray, index) => (
                <div className="border p-2 mt-4" key={index}>
                    {wordArray.map((word, idx) => (
                        <div key={idx}>
                            <h1 className="text-xl text-left font-bold">
                                Word: {word.word} - Count: {word.wordCount}
                            </h1>
                            <h1 className="text-lg text-left mt-2 mb-2 font-medium">
                                Synonyms:
                            </h1>
                            <div className="grid grid-cols-5 gap-2">
                                {Array.isArray(word.synonyms) &&
                                word.synonyms.length > 0 ? (
                                    word.synonyms.map((synonym, i) => (
                                        <div
                                            key={i}
                                            className="text-left text-sm"
                                        >
                                            {synonym}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-left text-sm">
                                        No synonyms found
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
