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
import { createServer } from "../../../services/server";
import { useUser } from "@clerk/clerk-react";

const ModalCreateServer = ({addServer}) => {
    const user = useUser().user

    const [name, setName] = useState('')
    const [files, setFiles] = useState([]);

    const [uploadName, setUploadName] = useState('')

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const newServer = await createServer(name, uploadName, user.id)
            addServer(newServer)
            setUploadName('')
            setFiles([])
            document.getElementById('create_server_modal').close()
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
        <dialog id="create_server_modal" className="modal">
            <div className="modal-box bg-bg2 p-0 overflow-hidden">
                <div className="px-6 pt-8 pb-0">
                    <h3 className="font-bold text-2xl text-center text-black dark:text-white mb-4">Create a new server</h3>
                    <p className="text-center">Give your server a personality with a name and an image. <br />You can always change it later.</p>
                </div>
                <form onSubmit={(e) => { handleSubmit(e) }} className="space-y-8">
                    <div className="space-y-8 px-6">
                        <div className="w-full mt-4">
                            {
                                uploadName
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
                                            acceptedFileTypes={['image/png']}
                                        />
                                    )
                            }
                        </div>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-xs font-bold">SERVER NAME</span>
                            </div>
                            <input
                                type="text"
                                name="serverName"
                                placeholder="Enter server name"
                                required
                                value={name}
                                onChange={handleNameChange}
                                className="input input-bordered w-full bg-bg3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <div className="label">
                                <span className="label-text-alt italic">Server name is required.</span>
                            </div>
                        </label>
                    </div>

                    <div className="px-6 py-4 bg-bg1 text-center">
                        <button className={`btn w-full bg-primary text-white hover:bg-primary hover:brightness-75 border-0 transition-all duration-300 ${name === '' && 'btn-disabled'}`}>Create</button>
                    </div>
                </form>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog >
    )
}

export default ModalCreateServer