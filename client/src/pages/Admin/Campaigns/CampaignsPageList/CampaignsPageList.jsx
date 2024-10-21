import React, { useState, useEffect } from "react";
import axios from "axios";
import Campaign from "../../../../components/Campaign/Campaign";
import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6"
import { FaPen } from "react-icons/fa6"

const url = import.meta.env.VITE_SERVER_URL || "http://localhost:80"

function CampaignsPageList() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        axios.get(`${url}/campaign`).then((response) => {
            setCampaigns(response.data);
            console.log(response.data)
        });
    }, []);

    function deleteItem(id) {
        axios.delete(`${url}/campaign/${id}`).then((response) => {
            setCampaigns((prevItems) => prevItems.filter((campaign) => campaign._id !== id));
        });
    }

    return (
        <div className="main">
            <div>
                <h1>Campanhas</h1>
                <div className="page-container">
                    <table className="centered-table">
                        <thead>
                            <tr>
                                <th>Campanha</th>
                                <th className="w-60">Initial Date</th>
                                <th className="w-60">Expiry Date</th>
                                <th colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((campaign) => (
                                <tr key={campaign._id}>
                                    <td><Campaign campaign={campaign} /></td>
                                    <td>{campaign.start}</td>
                                    <td>{campaign.end}</td>
                                    <td><Link to={`/EditCampaign/${campaign._id}`}><button className="button-acoes-edit"><FaPen /></button></Link></td>
                                    <td><button className="button-acoes-delete" onClick={() => deleteItem(campaign._id)}><FaTrashCan /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CampaignsPageList;
