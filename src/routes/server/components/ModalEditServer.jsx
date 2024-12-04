/* eslint-disable react/prop-types */
import { FilePond, registerPlugin } from 'react-filepond'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"

import { useEffect, useState } from "react";
import { updateSettings } from '../../../services/server';

const ModalEditServer = ({ server, setServer, userId }) => {
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('')
    const [uploadName, setUploadName] = useState('')
    const [originalUploadName, setOriginalUploadName] = useState('')

    useEffect(() => {
        if (server) {
            setName(server.name)
            setUploadName(server.imageUrl)
            setOriginalUploadName(server.imageUrl)
        }
    }, [server])

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (server.profile === userId) {
            try {
                if (originalUploadName && originalUploadName !== uploadName) {
                    try {
                        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/upload/files/${originalUploadName}`)
                        if (res?.status !== 200) {
                            console.error('Failed to delete image:', res.data);
                        }
                    } catch (error) {
                        console.error('Error deleting the image:', error);
                    }
                }
                await updateSettings(server.id, name, uploadName)
                setServer({
                    ...server,
                    name,
                    imageUrl: uploadName
                })
                setOriginalUploadName(uploadName)
                document.getElementById('edit_server_modal').close()
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleCancelImage = async () => {
        setUploadName('')
        setFiles([])
    }

    return (
        <dialog id="edit_server_modal" className="modal">
            <div className="modal-box bg-bg2 p-0 overflow-hidden">
                <div className="px-6 pt-8 pb-0">
                    <h3 className="font-bold text-2xl text-center text-black dark:text-white mb-4">Customize your server</h3>
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
                                            onprocessfile={(error, file) => {
                                                if (error) {
                                                    console.error('Error uploading file:', error);
                                                    return;
                                                }
                                                const parsed = JSON.parse(file.serverId)
                                                if (parsed.file.filename) {
                                                    setUploadName(parsed.file.filename)
                                                }
                                            }}
                                            server={{
                                                process: {
                                                    url: `${import.meta.env.VITE_API_URL}/upload`,
                                                    method: 'POST',
                                                    withCredentials: false,
                                                    onload: (response) => {
                                                        return response;
                                                    },
                                                    onerror: (error) => {
                                                        console.error(error);
                                                    }
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
                        <button className={`btn w-full bg-primary text-white hover:bg-primary hover:brightness-75 border-0 transition-all duration-300 ${name === '' && 'btn-disabled'}`}>Save settings</button>
                    </div>
                </form>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog >
    )
}

export default ModalEditServer