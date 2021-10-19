import { auth } from 'fbase';

const Profile = () => <span>Profile</span>

export default () => {
    const onLogOutClick = () => auth.signOut();
    return (
    <>
    <button onClick ={onLogOutClick}>Log out</button>
    </>
    );
};