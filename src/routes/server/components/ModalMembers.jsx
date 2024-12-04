/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getProfile } from "../../../services/profile"
import { updateMemberRole } from "../../../services/member";
import { kickMember } from "../../../services/server";

const ModalMembers = ({ server }) => {
    const [profiles, setProfiles] = useState([])
    const [loadingId, setLoadingId] = useState(null)
    const roleIconMap = {
        "GUEST": null,
        "MODERATOR": <FontAwesomeIcon className="ml-2 text-primary" icon="fa-solid fa-shield-halved" />,
        "ADMIN": <FontAwesomeIcon className="ml-2 text-red" icon="fa-solid fa-shield" />
    }

    useEffect(() => {
        if (server && profiles?.length === 0) {
            const fetchProfiles = async () => {
                try {
                    const profilesPromises = server.members.map(async (member) => {
                        const res = await getProfile(member.profile)
                        return {
                            ...res.data,
                            memberId: member.id,
                            role: member.role
                        }
                    })
                    let profilesData = await Promise.all(profilesPromises)
                    setProfiles(profilesData);
                } catch (error) {
                    console.log(error)
                }
            }

            fetchProfiles()
        }
    }, [server, profiles])

    const onRoleChange = async (profile, newRole) => {
        try {
            setLoadingId(profile.id)
            const response = await updateMemberRole(profile.memberId, newRole)

            setProfiles((prev) =>
                prev.map((p) =>
                    p.id === profile.id
                        ? { ...p, role: response.role }
                        : p))
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingId(null)
        }
    }

    const onKick = async (profile) => {
        try {
            setLoadingId(profile.id)
            await kickMember(server.id, profile.memberId)
            setProfiles((prev) => prev.filter((p) => p.id !== profile.id))
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingId(null)
        }
    }

    if (!server) {
        return <div>...Loading</div>
    }
    return (
        <dialog id="member_modal" className="modal">
            <div className="modal-box rounded-lg bg-bg2 p-0 overflow-hidden relative">
                <div className="px-6 pt-8 pb-0">
                    <h3 className="font-bold text-2xl text-center text-black dark:text-white mb-4">Manage members</h3>
                    <div className="text-center">
                        {server.members?.length} Members
                    </div>
                </div>

                <div className="mt-8 px-6 relative">
                    {
                        profiles && profiles.map((profile) => {
                            return (
                                <div className="flex items-center gap-x-2 mb-6 relative" key={profile.id}>
                                    <img className="h-7 w-7 md:h-10 md:w-10 rounded-full shadow-lg border border-bg0" src={profile.imageUrl} />
                                    <div className="flex flex-col gap-y-1">
                                        <div className="text-xs font-semibold flex items-center">
                                            {profile.name}
                                            {roleIconMap[profile.role]}
                                        </div>
                                        <p className="text-xs">{profile.email}</p>
                                    </div>
                                    {
                                        server.profile !== profile.id && (
                                            loadingId !== profile.id
                                                ?
                                                (
                                                    <div className="ml-auto relative">
                                                        <details className="dropdown dropdown-left dropdown-end">
                                                            <summary className="btn btn-ghost w-12 h-12"><FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" /></summary>
                                                            <ul className="menu dropdown-content shadow text-sm font-medium space-y-0.5 bg-bg3 m-2 rounded-lg px-2 py-1.5">
                                                                <li>
                                                                    <details className="dropdown dropdown-left">
                                                                        <summary className=""><FontAwesomeIcon className="mr-1" icon="fa-solid fa-shield-halved" />Role</summary>
                                                                        <ul className="menu dropdown-content shadow min-w-44 text-sm font-medium space-y-0.5 bg-bg3 m-2 rounded-lg px-2 py-1.5">
                                                                            <li>
                                                                                <a onClick={() => onRoleChange(profile, "GUEST")}>
                                                                                    <span className="w-3.5"></span>Guest
                                                                                    {profile.role === "GUEST" && (
                                                                                        <FontAwesomeIcon className="ml-auto" icon="fa-solid fa-check" />
                                                                                    )}
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a onClick={() => onRoleChange(profile, "MODERATOR")}>
                                                                                    <FontAwesomeIcon className="text-primary" icon="fa-solid fa-shield-halved" />Moderator
                                                                                    {profile.role === "MODERATOR" && (
                                                                                        <FontAwesomeIcon className="ml-auto" icon="fa-solid fa-check" />
                                                                                    )}
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </details>
                                                                </li>
                                                                <li><a onClick={() => onKick(profile)}><FontAwesomeIcon icon="fa-solid fa-gavel" />Kick</a></li>
                                                            </ul>
                                                        </details>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <span className="loading loading-spinner loading-xs ml-auto"></span>
                                                )
                                        )
                                    }
                                </div>
                            )
                        })}
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog >
    )
}

export default ModalMembers