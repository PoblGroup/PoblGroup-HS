import { useMsal } from "@azure/msal-react";

function handleLogout(instance) {
    instance.logoutPopup().catch(e => {
        console.error(e);
    });
}

const SignOut = () => {
    const { instance, accounts } = useMsal();
    // const name = accounts[0] && accounts[0].name

    return (
        <div>
            {/* <p>Signed in as: <a href="#login">{name}</a></p> */}
            <button className="btn" onClick={() => handleLogout(instance)}>
                Sign out
            </button>
        </div>
    )
}

export default SignOut