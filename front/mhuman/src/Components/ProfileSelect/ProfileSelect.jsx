import React, { useEffect, useState } from 'react';

import './profileselect.scss';
import { Link } from 'react-router-dom';
import logo from './fakeData/Logo-Mhumain-Colored.png';
import AddProfile from './AddProfile/AddProfile';
import ProfileCard from './ProfileCard/ProfileCard';
import { catProfilesRequest, humanProfilesRequest } from '../../requests/profilesRequest';

import { setToken } from '../../requests/instance';
import { catLoginRequest, humanLoginRequest } from '../../requests/loginRequest';
import LoginContext from '../../contexts/LoginContext';


function ProfileSelect() {
  const [catsProfile, setCatsProfile] = useState('');
  const [humansProfile, setHumansProfile] = useState('');

  useEffect(() => { // j'essaye de récupérer les profils de chat et d'humain pour l'utilisateur connecté
    async function getUserProfile() {
      try {
        const [userCats, userHumans] = await Promise.all([
          catProfilesRequest(),
          humanProfilesRequest(),

        ]);
        setCatsProfile(userCats);
        setHumansProfile(userHumans);
      } catch (error) {
        console.log(error);
      }
    }
    getUserProfile();
  }, []);


  const handleCatProfileClick = async (pseudo) => {
    try {
      const response = await catLoginRequest(pseudo);
      localStorage.setItem('isLogged', response.logged);
      localStorage.setItem('profilePseudo', response.pseudo);
      localStorage.setItem('type', 'cat');
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // fonction afin de récupérer le pseudo, et le type lors du click sur le profil
  const handleHumanProfileClick = async (pseudo) => {
    try {
      const response = await humanLoginRequest(pseudo);
      addLoginInformation({ isLogged: response.logged, profilePseudo: response.pseudo, type: 'human' });
    } catch (err) {
      console.log(err.response.data);
    }
  };


  return (
    <div className="ProfileSelect">
      <img src={logo} className="ProfileTitle" alt="logo" />
      <section className="ProfileContainer">
        <div className="CatProfile">
          <h1 className="ProfileSubtitle"> Profils Chats</h1>
          <div className="DisplayProfile">

            {catsProfile
              && catsProfile.map(({ pseudo, image, id }) => (
                <ProfileCard
                  key={id}
                  pseudo={pseudo}
                  image={image}
                />
              ))}

            <Link to="/createprofilecat">
              <AddProfile />
            </Link>
          </div>
        </div>
        <div className="HumainProfile">
          <h1 className="ProfileSubtitle"> Profils Humain</h1>
          <div className="DisplayProfile">

            {humansProfile.length > 0
              ? humansProfile.map(({ pseudo, image, id }) => (

                <Link
                  to="/homepage"
                  onClick={() => handleHumanProfileClick(pseudo)}
                >
                  <ProfileCard
                    key={id}
                    pseudo={pseudo}
                    image={image}
                  />
                </Link>

              ))
              : (
                <Link to="/createprofilehuman">
                  <AddProfile />
                </Link>
              )}

          </div>
        </div>
      </section>
    </div>
  );
}

export default React.memo(ProfileSelect);
