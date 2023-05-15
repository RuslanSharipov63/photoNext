const ButtonForInput = (props) => {
    return <button
        className="btn waves-effect waves-light"
        value="ANY_VALUE_HERE"
        type="submit"
        disabled={!props.isvalid}
        onClick={props.handleUpload}
    >
        {props.text}
    </button>


}

export default ButtonForInput;
