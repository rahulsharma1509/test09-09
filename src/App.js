import './App.css'
import SendbirdApp from '@sendbird/uikit-react/App';
import '@sendbird/uikit-react/dist/index.css';
import CustomisedApp from './CustomisedApp';




          function App() {
            return (
              <div className="App">
                <SendbirdApp
                appId='4EF65B48-521C-4806-937F-374EDE5F74E8' 
                userId='testuse15' 
                isMentionEnabled={true} 
                is_distinct={true}   
                >
                  <CustomisedApp />
                  </SendbirdApp>
               </div>  
            )
          }


export default App;
