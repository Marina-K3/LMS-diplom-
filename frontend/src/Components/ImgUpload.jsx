import React, { useState } from "react";
import axios from "axios";

const ImgUpload = ({ onChange, src }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(src || null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setPreview(URL.createObjectURL(file));
            if (onChange) {
                onChange(file);  // Передаем сам файл, а не событие
            }
        }
    };

    return (
        <div>
            <label htmlFor="photo-upload" className="custom-file-upload">
                <div className="img-wrap img-upload">
                    {preview ? (
                        <img src={preview} alt="Preview" />
                    ) : (
                        <div style={{ marginTop: "32px" }}>Загрузите своё фото ✌</div>
                    )}
                </div>
                <input id="photo-upload" type="file" onChange={handleFileChange} />
            </label>
        </div>
    );
};

export default ImgUpload;
