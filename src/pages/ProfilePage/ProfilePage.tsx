import React, { type FC } from 'react';
import { ProfileFormConnected } from '../../features/forms/ProfileForm';
import { profileUpdated } from '../../app/store/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import './profilePage.css';

export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.profile);

  if (!profile) {
    return null;
  }

  return (
    <section className="profilePage">
      <div className="profilePage__header">
        <h1 className="profilePage__title">Profile</h1>
      </div>
      <div className="profilePage__meta">
        <span>{profile.email}</span>
        <span className="profilePage__role">{profile.role}</span>
      </div>
      <ProfileFormConnected
        className="profilePage__form"
        initialValues={{ name: profile.name, about: profile.about }}
        onSubmit={(values) => dispatch(profileUpdated(values))}
      />
    </section>
  );
};
