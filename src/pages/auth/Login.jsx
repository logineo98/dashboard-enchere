import React, { useEffect, useState } from 'react'
import { Card } from '../../components'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { default_admin, handleChange, isEmpty, login } from '../../libs'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const Login = () => {
    var datas = { email: "", phone: "", password: "" }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState(datas);
    const [validation, setValidation] = useState({ username: "", password: "" });
    const { isAuth, errors } = useSelector(state => state?.user);
    const [oldPath, setOldPath] = useState("")

    useEffect(() => {
        if (errors && errors !== undefined) {
            const swalWithBootstrapButtons = Swal.mixin({ customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' }, buttonsStyling: false })
            swalWithBootstrapButtons.fire({
                title: 'Impossible',
                text: errors,
                icon: 'error',
                confirmButtonText: "D'accord",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/")
                }
            })
            dispatch({ type: "_user_clear_errors" })
        }
    }, [errors, navigate, dispatch])

    useEffect(() => {
        dispatch(default_admin())
    }, [dispatch])


    const fielController = () => {
        const regexPhone = /(^(\+223|00223)?[5-9]{1}[0-9]{7}$)/;
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        let username = '';
        if (!isEmpty(inputs.email) || isEmpty(inputs.phone)) username = inputs.email
        if (isEmpty(inputs.email) || !isEmpty(inputs.phone)) username = inputs.phone

        if (isEmpty(username)) setValidation(old => { return { ...old, username: "E-mail ou numero de telephone non renseigner" } }); else
            if (username.includes('@') && !regexEmail.test(username)) setValidation(old => { return { ...old, username: "Format e-mail incorrecte!" } });
            else if (!username.includes('@') && regexPhone.test(username)) setValidation(old => { return { ...old, username: "Format du numero incorrecte!" } }); else
                setValidation(old => { return { ...old, username: "" } });


        if (isEmpty(inputs.password)) setValidation(old => { return { ...old, password: "Mot de passe non renseigner" } });
        else if (inputs.password?.length < 6) setValidation(old => { return { ...old, password: "Mot de passe trop court!" } }); else
            setValidation(old => { return { ...old, password: "" } });
    }


    useEffect(() => {
        if (validation.username !== "") toast.error(validation.username, { position: "top-right" })
        if (validation.password !== "") toast.error(validation.password, { position: "top-right" })
    }, [validation])


    useEffect(() => {
        const path = localStorage.getItem("previousPath");
        setOldPath(path)
        if (isAuth && path !== "") navigate(path)
    }, [isAuth, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        fielController()
        inputs.dashboard = true
        dispatch(login(inputs));
        if (oldPath) navigate(oldPath); else navigate("/dashboard")
    };

    return (
        <form onSubmit={handleSubmit} className='login-container'>
            <div className="login-box">
                <div className="login-text">
                    <div className="login-img-container">
                        <img src="assets/login-logo.png" alt="" className='login-image' />
                    </div>
                    <div className="title">meYere</div>
                    <span>Veuillez entrer votre nom d'utilisateur et votre mot de passe pour vous connecter.</span>
                </div>
                <Card>   <div className="login-items">
                    <div className="login-item">
                        <label htmlFor="username">Nom d'utilisateur <span className='required'>*</span></label>
                        <input type="text" onChange={(e) => setInputs({
                            email: e.target.value.includes('@') ? e.target.value : '',
                            phone: !e.target.value.includes('@') ? e.target.value : '',
                        })
                        }
                            value={inputs?.email || inputs?.phone} />
                        <small>{validation?.username}</small>
                    </div>

                    <div className="login-item">
                        <label htmlFor="password">Mot de passe <span className='required'>*</span></label>
                        <input type="password" name='password' value={inputs?.password} onChange={(e) => handleChange(e, setInputs)} />
                        <small>{validation?.password}</small>
                    </div>

                    <div className="button-box"> <button>Se connecter</button></div>
                </div>

                </Card>
            </div>
        </form >)
}

export default Login