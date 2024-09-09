// import { Channel, ChannelList, SendBirdProvider } from '@sendbird/uikit-react';
// import { useState } from 'react';
// import './App.css';
// import '@sendbird/uikit-react/dist/index.css';
//           const APP_ID = '4EF65B48-521C-4806-937F-374EDE5F74E8';
//           const USER_ID = 'testuse15';
//           function CustomisedApp() {
//             const [currentChannelUrl, setCurrentChannelUrl] = useState('');
//             return (
//               <div className="App">
//                 <SendBirdProvider appId={APP_ID} userId={USER_ID}>
//                   <>
//                     <Channel channelUrl={currentChannelUrl}>
//                     </Channel>
//                     <ChannelList
//                       onChannelSelect={(channel) => {
//                         if (channel?.url) {
//                           setCurrentChannelUrl(channel.url);
//                         }
//                       }}
//                       renderHeader={() => <div>My Header</div>}
//                     />
// {/* isMentionEnabled={true}
// config={{
// userMention: {
// maxMentionCount: 10,
// maxSuggestionCount: 15,
//     }
//   }} */}
//                   </>
//                 </SendBirdProvider>
//               </div>
              
//             );
//           }
//           // const Example2 = () => {
//           //     return (
//           //         <SendBirdProvider
//           //             appId={APP_ID}
//           //             userId={USER_ID}
//           //             imageCompression={{
//           //                 compressionRate: 0.5,
//           //                 // The default value changed from 1.0 to 0.7 starting in v3.3.3.
//           //                 resizingWidth: 1024,
//           //                 resizingHeight: 1024,
//           //             }}
//           //         >
//           //         </SendBirdProvider>
//           //     );
//           //           }
//           export default CustomisedApp;





import { Channel, ChannelList, SendBirdProvider,ChannelSettings,withSendBird,sendBirdSelectors } from '@sendbird/uikit-react';
import { useState } from 'react';
import './App.css';
import '@sendbird/uikit-react/dist/index.css';

          const appId = '4EF65B48-521C-4806-937F-374EDE5F74E8';
          const userId = 'testuse15';
          const nickname = 'nick'
          function CustomisedApp() {
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState(null);

  return (
    <div style={{ height: '100vh' }}>
      <SendBirdProvider
        appId={process.env.APP_ID}
        userId={userId}
        nickname={nickname}
      >
        <div className='sendbird-app__wrap'>
          <div className='sendbird-app__channellist-wrap'>
            <CustomChannelListWithSendbird
              setCurrentChannelUrl={setCurrentChannelUrl}
            />
          </div>
          <div className='sendbird-app__conversation-wrap'>
            <Channel
              channelUrl={currentChannelUrl}
              onChatHeaderActionClick={() => {
                setShowSettings(true);
              }}
            />
          </div>
        </div>
        {showSettings && (
          <div className='sendbird-app__settingspanel-wrap'>
            <ChannelSettings
              channelUrl={currentChannelUrl}
              onCloseClick={() => {
                setShowSettings(false);
              }}
            />
          </div>
        )}
      </SendBirdProvider>
    </div>
  );
};

const CustomChannelList = ({ sdk, setCurrentChannelUrl }) => {
  console.log(sdk);
  return (
    <ChannelList
      onChannelSelect={(channel) => {
        if (channel && channel.url) {
          setCurrentChannelUrl(channel.url);
        }
      }}
      onBeforeCreateChannel={(selectedUsers) => {
        if (!sdk || !sdk.GroupChannelCreateParams) {
          return;
        }
        const channelParams: GroupChannelCreateParams = {
          name: 'Hello Sendbird!',
          invitedUserIds: selectedUsers,
          isDistinct: true,
        };
      }}
    ></ChannelList>
  );
};

const mapSendbirdStateToProps = (state) => {
  return {
    sdk: sendBirdSelectors.getSdk(state),
  };
};

const CustomChannelListWithSendbird = withSendBird(
  CustomChannelList,
  mapSendbirdStateToProps,
);

export default CustomisedApp;
