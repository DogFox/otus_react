import React, { type FC } from 'react';
import { ProfileFormConnected } from '../../features/forms/ProfileForm';
import './profilePage.css';

export const ProfilePage: FC = () => {
  return (
    <section className="profilePage">
      <div className="profilePage__header">
        <h1 className="profilePage__title">Profile</h1>
      </div>
      <ProfileFormConnected className="profilePage__form" />
    </section>
  );
};
