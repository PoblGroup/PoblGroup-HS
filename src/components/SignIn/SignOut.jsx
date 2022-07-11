import { useMsal } from "@azure/msal-react";

function handleLogout(instance) {
    instance.logoutPopup().catch(e => {
        console.error(e);
    });
}

const SignOut = () => {
    const { instance } = useMsal();

    return (
        <div className="sign-out-btn">
            <button className="btn" onClick={() => handleLogout(instance)}>
                Sign out
            </button>
        </div>
    )
}

export default SignOut