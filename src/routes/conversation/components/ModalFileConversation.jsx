/* eslint-disable react/prop-types */
import { useState } from "react"
import axios from "axios"

import { FilePond, registerPlugin } from 'react-filepond'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createDirectMessage } from "../../../services/socket";

const ModalFileConversation = ({ conversation, userId }) => {
    const [files, setFiles] = useState([]);

    const [fileType, setFileType] = useState('image') //image / pdf
    const [uploadName, setUploadName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createDirectMessage(userId, conversation.id, '', uploadName)
            setUploadName('')
            setFiles([])
            document.getElementById('conversation_file_modal').close()
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancelImage = async () => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/upload/files/${uploadName}`)
            if (res?.status !== 200) {
                console.error('Failed to delete image:', res.data);
            }
        } catch (error) {
            console.error('Error deleting the image:', error);
        }
        setUploadName('')
        setFiles([])
    }

    return (
        <dialog id="conversation_file_modal" className="modal">
            <div className="modal-box bg-bg2 p-0 overflow-hidden">
                <div className="px-6 pt-8 pb-0">
                    <h3 className="font-bold text-2xl text-center text-black dark:text-white mb-4">Add an attachment</h3>
                    <p className="text-center">Send a file as a message.</p>
                </div>
                <form onSubmit={(e) => { handleSubmit(e) }} className="space-y-8">
                    <div className="space-y-8 px-6">
                        <div className="w-full mt-4">
                            {
                                uploadName
                                    ?
                                    fileType === 'image'
                                        ?
                                        (
                                            <div className="relative w-20 h-20 mx-auto">
                                                <img src={`${import.meta.env.VITE_API_URL}/upload/files/${uploadName}`} alt="" className="rounded-full w-full h-full object-cover" />
                                                <button type="button" onClick={handleCancelImage} className="h-6 w-6 p-1 bg-red rounded-full flex justify-center items-center text-white text-sm absolute top-0 right-0 shadow transform duration-300 hover:brightness-75">
                                                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                                                </button>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="relative flex items-center p-3 pr-6 mt-2 rounded-md bg-bg0">
                                                <FontAwesomeIcon className=" text-4xl" icon="fa-regular fa-file-pdf" />
                                                <a href={`${import.meta.env.VITE_API_URL}/upload/files/${uploadName}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-primary hover:underline break-all">{`${import.meta.env.VITE_API_URL}/upload/files/${uploadName}`}</a>
                                                <button type="button" onClick={handleCancelImage} className="h-6 w-6 p-1 bg-red rounded-full flex justify-center items-center text-white text-sm absolute top-0 right-0 shadow transform duration-300 hover:brightness-75">
                                                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                                                </button>
                                            </div>
                                        )
                                    :
                                    (
                                        <FilePond
                                            instantUpload={false}
                                            files={files}
                                            onupdatefiles={setFiles}
                                            allowMultiple={false}
                                            maxFiles={1}
                                            server={{
                                                process: {
                                                    url: `${import.meta.env.VITE_API_URL}/upload`,
                                                    method: 'POST',
                                                    withCredentials: false,
                                                    onload: (response) => {
                                                        const parsed = JSON.parse(response)
                                                        if (parsed.file.filename) {
                                                            setUploadName(parsed.file.filename)
                                                            if (parsed.file.contentType === 'application/pdf') {
                                                                setFileType('pdf')
                                                            } else {
                                                                setFileType('image')
                                                            }
                                                        }
                                                        return response;
                                                    },
                                                    onerror: (error) => {
                                                        console.error(error);
                                                    }
                                                },
                                                revert: (filename, load, error) => {
                                                    const file = JSON.parse(filename).file
                                                    fetch(`${import.meta.env.VITE_API_URL}/upload/files/${file.filename}`, {
                                                        method: "DELETE",
                                                    })
                                                        .then((res) => {
                                                            if (res.ok) {
                                                                load();
                                                            } else {
                                                                error("Failed to delete file");
                                                            }
                                                        })
                                                        .catch((err) => {
                                                            console.error("Error deleting file:", err);
                                                            error("An error occurred while deleting the file");
                                                        });
                                                }
                                            }}
                                            name="file"
                                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                            acceptedFileTypes={['image/*', 'application/pdf']}
                                        />
                                    )
                            }
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-bg1 text-center">
                        <button className={`btn w-full bg-primary text-white hover:bg-primary hover:brightness-75 border-0 transition-all duration-300 ${uploadName === "" && 'btn-disabled'}`}>Send</button>
                    </div>
                </form>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog >
    )
}

export default ModalFileConversation