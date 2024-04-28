import React, { memo, useEffect, useState } from 'react'
import { useStore } from '@/stores';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import ConversationList from './ConversationList/ConversationList';
import MessageList from './MessageList/MessageList';
import InfoList from './InfoList/InfoListIndex';
import './ChatV2Index.scss';
import '@/common/CommonStyles.scss';

function ChatIndex() {
    const { chatStore, authStore } = useStore();

    const {
        resetStore,
        getAllJoinedRooms,
        setIsLoading
    } = chatStore;

    const navigate = useNavigate();
    useEffect(function () {

        setIsLoading(true);
        // registerUser();
        getAllJoinedRooms()
            .finally(function () {
                setIsLoading(false);
            })

        return resetStore;
    }, []);

    return (
        <div
            className="app flex-center w-100 p-0 m-0 flex-1"
        >
            <div className="messenger">
                <div className="scrollable sidebar">
                    <ConversationList />
                </div>
                <div className="scrollable content p-0">
                    <MessageList />
                </div>
                <div className="sidebar d-none d-lg-block">
                    <InfoList />
                </div>
            </div>
        </div>
    )
}

export default memo(observer(ChatIndex));