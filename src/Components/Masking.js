import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Masking() {
    const [fileWordCombinations, setFileWordCombinations] = useState([
        { file: null, word: "" },
    ]);
    const [email, setEmail] = useState("");
    const [uploadedUrls, setUploadedUrls] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e, index) => {
        const newCombinations = [...fileWordCombinations];
        newCombinations[index].file = e.target.files[0];
        setFileWordCombinations(newCombinations);
    };

    const handleWordChange = (e, index) => {
        const newCombinations = [...fileWordCombinations];
        newCombinations[index].word = e.target.value;
        setFileWordCombinations(newCombinations);
    };

    const handleAddMore = () => {
        setFileWordCombinations([
            ...fileWordCombinations,
            { file: null, word: "" },
        ]);
    };

    const handleUpload = async () => {
        setUploading(true);
        const urls = [];
        for (const combination of fileWordCombinations) {
            const formData = new FormData();
            formData.append("file", combination.file);
            formData.append("email", email);
            formData.append("words", combination.word);

            try {
                const res = await axios.post(
                    "http://localhost:3001/api/v1/files/mask-words",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                urls.push(res.data.data[0]);
            } catch (err) {
                setError(err.message);
                setUploading(false);
                return;
            }
        }
        setUploadedUrls(urls);
        setUploading(false);
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
            <hr />
            <div>
                {fileWordCombinations.map((combination, index) => (
                    <div key={index}>
                        <input
                            className="w-96 border p-2 mt-2"
                            type="text"
                            value={combination.word}
                            onChange={(e) => handleWordChange(e, index)}
                            placeholder="Enter the word"
                        />
                        <div className="file-input">
                            <input
                                type="file"
                                name="file"
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
                Add Files
            </button>
            <button
                className="border ml-4 p-2 bg-black text-white rounded-xl"
                onClick={handleUpload}
                disabled={
                    uploading ||
                    fileWordCombinations.some(
                        ({ file, word }) => !file || !word
                    ) ||
                    !email
                }
            >
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {uploadedUrls.length > 0 && (
                <div className="mt-10">
                    <h1 className="font-bold">
                        The URLs for the uploaded Files are:
                    </h1>
                    {uploadedUrls.map((url, index) => (
                        <h1 className="font-semibold" key={index}>
                            {url}
                        </h1>
                    ))}
                </div>
            )}
        </div>
    );
}
