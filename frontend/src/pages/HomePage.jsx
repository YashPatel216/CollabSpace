  import { UserButton } from '@clerk/clerk-react'
  import React, { useEffect, useState } from 'react'
  import { useSearchParams } from "react-router-dom";
  import { useStreamChat } from '../hooks/useStreamChat.js'
  import PageLoader from '../components/PageLoader.jsx'
  import { PlusIcon } from 'lucide-react'
  import CustomChannelPreview from '../components/CustomChannelPreview.jsx'
  import '../styles/stream-chat-theme.css'

  import { Chat, Channel, ChannelList, MessageList, MessageInput, Thread, Window } from "stream-chat-react"
  import CreateChannelModal from '../components/CreateChannelModel.jsx'

  const HomePage = () => {

    const [activeChannel, setactiveChannel] = useState(null)
    const [isCreateModelOpen, setIsCreateModalOpen] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams();

    const { chatClient, isLoading, error } = useStreamChat();

    useEffect(() => {
      if (chatClient) {
        const channelId = searchParams.get("channel")

        if (channelId) {
          const channel = chatClient.channel("messaging", channelId)
          setactiveChannel(channel)
        }
      }

    }, [chatClient, searchParams])


    // change this with component in future
    if (error) {
      return <p>Something went wrong</p>
    }

    if (isLoading || !chatClient) {
      return <PageLoader />
    }

    return (
      <div className='chat-wrapper'>
        <Chat client={chatClient}>
          <div className="chat-container">
            {/* LEFT SIDEBAR */}
            <div className="str-chat__channel-list">
              <div className="team-channel-list">
                {/* HEADER */}
                <div className="team-channel-list__header gap-4">

                  <div className="brand-container">
                    <img src="/logo.png" alt="Logo" className="brand-logo" />
                    <span className="brand-name">Slap</span>
                  </div>
                  <div className="user-button-wrapper">
                    <UserButton />
                  </div>
                </div>

                {/* CHANNELS LIST */}
                <div className="team-channel-list__content">
                  <div className="create-channel-section">
                    <button onClick={() => setIsCreateModalOpen(true)} className="create-channel-btn">
                      <PlusIcon className="size-4" />
                      <span>Create Channel</span>
                    </button>
                  </div>

                <ChannelList 
                  filters={{members: {$in: [chatClient?.user?.id]}}}
                  options={{state: true, watch: true}}
                  Preview={(channel)=>(
                    <CustomChannelPreview
                      channel={channel}
                      activeChannel={activeChannel}
                      setActiveChannel={(channel)=>setSearchParams({ channel : channel.id})}

                    />
                  )}
                  List={({children,loading,error})=>(
                    <div className='channel-sections'> 
                    <div className='section-header'> 
                      <div className='section-title'>
                        <HashIcon className="size-4" />
                        <span>Channels</span> 
                    </div>
                    </div>
                    <div className='channel-list'>{children}</div>
                    </div>
                  )}
                />
                </div>
              </div>
            </div>

            {/* RIGHT CONTAINER */}
            <div className="chat-main">
              <Channel channel={activeChannel}>
                <Window>
                  {/*<CustomChannelHeader /> */}
                  <MessageList />
                  <MessageInput />
                </Window>

                <Thread />
              </Channel>
            </div>
          </div>

          {isCreateModelOpen && (
            <CreateChannelModal isOpen={isCreateModelOpen}
            onClose={()=>setIsCreateModalOpen(false)}/> 
          )}
        </Chat>
      </div>
    )
  }

  export default HomePage;