import React, { useState, useEffect } from "react";
import axios from "axios";
import Item from "../../../../components/Item/Item";
import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6"
import { FaPen } from "react-icons/fa6"

const url = import.meta.env.VITE_SERVER_URL || "http://localhost:80"

function ItemsPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`${url}/items`).then((response) => {
            console.log(response.data)
            setItems(response.data);
        });
    }, []);

    function deleteItem(id) {
        axios.delete(`${url}/items/${id}`).then((response) => {
            setItems((prevItems) => prevItems.filter((item) => item._id !== id));
        });
    }

    return (
        <div>
            <h1>Items</h1>
            <div className="page-container">
                <table className="centered-table text-sm text-gray-800">
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Item</th>
                            <th colSpan="2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} >
                                <td><img src={item.image} width={60} className="images"></img></td>
                                <td className="w-[20rem]"><Item item={item} /></td>
                                <td><Link to={`/editItem/${item.id}`} style={{ color: 'black' }}><button className="button-acoes-edit"><FaPen /></button></Link></td>
                                <td><button className="button-acoes-delete" onClick={() => deleteItem(item.id)}><FaTrashCan /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default ItemsPage;
