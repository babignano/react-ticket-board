import { useAuth0 } from '@auth0/auth0-react';

function Header() {
    const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();

    return (
        <header className="flex justify-between items-center p-4 bg-white shadow">
            <h1 className="text-xl font-bold">Ticket Board</h1>
            <div className="flex items-center gap-4">
                {isLoading ? (
                    <span>Loading...</span>
                ) : isAuthenticated ? (
                    <>
                        <span className="text-sm text-gray-600">{user?.email}</span>
                        <button
                            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Log out
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => loginWithRedirect()}
                        className="px-4 py-2 text-sm bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
                    >
                        Log in
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;