import { Link } from 'react-router-dom';


function Oferta(props) {
    return (<div>


        {/* <Link to={`/campaigns/${props.campaign._id}`}> */}
        {props.campaign.name}
        {/* </Link> */}

    </div>)
}
export default Oferta