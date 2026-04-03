import React from 'react';
import * as Icons from 'react-icons/fa';

export const ALL_AVATARS = [
    'FaUser', 'FaRobot', 'FaCat', 'FaDog', 'FaUserNinja', 
    'FaUserSecret', 'FaUserAstronaut', 'FaGhost', 'FaDragon', 'FaOtter',
    'FaFrog', 'FaHippo', 'FaHorse', 'FaFish', 'FaBug', 'FaSpider'
];

export const renderAvatar = (avatarName, className = "") => {
    const IconComponent = Icons[avatarName] || Icons.FaUser;
    return <IconComponent className={className} />;
};
