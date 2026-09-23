import {StyleSheet, 
        Text, 
        View, 
        ScrollView, 
        Alert,
        TextInput, 
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions} from 'react-native';
import { useState } from 'react';

const ANDROID_BACKGROUND_COLOR = '#FFFFE0'; 
const IOS_BACKGROUND_COLOR = '#B0E0E6'; 

export default function App() {
  const [enteredFeedback, setEnteredFeedback] = useState('');
  const [feedbackCollection, setFeedbackCollection] = useState([]);

  function feedbackInputHandler(enteredText) {
    setEnteredFeedback(enteredText);
  }

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  function addFeedbackHandler() {
    if (enteredFeedback.trim() === "") return;
    
    setFeedbackCollection((curFeedbackCollection) => [
      ...curFeedbackCollection,
      enteredFeedback,
    ]);
    setEnteredFeedback("");
  }

  return (
    <View style={[styles.appContainer, isLandscape && styles.landscapeAppContainer]}>
      <View style={[styles.header, isLandscape && styles.landscapeHeader]}>
        <Pressable onPress={ () => Alert.alert("Go to Home!") } >
            <Text style={styles.headerItem}>Home</Text>
        </Pressable>
        <Pressable onPress={ () => Alert.alert("Go to Catalog!") } >
            <Text style={styles.headerItem}>Catalog</Text>
        </Pressable>
        <Pressable onPress={ () => Alert.alert("Go to Order!") } >
            <Text style={styles.headerItem}>Order</Text>
        </Pressable>
        {isLandscape && <Image source={require('./assets/Feedback_Icon.png')} style={styles.navigationImage} />}
      </View>
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.headerText}>Feedback form</Text>
        <View style={[styles.inputContainer, isLandscape && styles.landscapeInputContainer]}>
          <TextInput
              editable
              multiline
              numberOfLines={6}
              maxLength={500}
              style={[styles.textInput, isLandscape && styles.landscapeTextInput]}
              placeholder="Enter your comment"
              onChangeText={feedbackInputHandler}
              value={enteredFeedback}
          />
          <Pressable 
              style={styles.button} 
              onPress={addFeedbackHandler} >
            <Text style={styles.buttonText}>Add feedback</Text>
          </Pressable>
        </View>
        <ScrollView
          style={styles.feedbackList}
          contentContainerStyle={styles.feedbackListContent}
          keyboardShouldPersistTaps="handled"
        >
          {feedbackCollection.map((feedback, index) =>
            <Pressable key={`${feedback}-${index}`} >
                <Text style={styles.feedbackItem}>
                  {feedback}
                </Text>
            </Pressable>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Platform.select({ android: ANDROID_BACKGROUND_COLOR, ios: IOS_BACKGROUND_COLOR }),
    flexDirection: 'column',
  },
  landscapeAppContainer: {
    flexDirection: 'row',
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D8BFD8',
    padding: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: 'green',   
  },
  landscapeHeader: {
    width: 170,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginRight: 16,
  },
  navigationImage: {
    width: 120,
    height: 90,
    resizeMode: 'contain',
  },
  main: {
    flex: 1,
    minWidth: 0,
  },
  headerItem: {   
    fontSize: 20,
    fontWeight: 'bold',
    color: "#00008B", 
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: "#00008B",
    marginTop: 15,
    marginBottom: 10,
  },
  inputContainer: {
    alignItems: 'center',
    paddingBottom: 28,
    marginBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#DDA0DD', 
  },
  landscapeInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 18,
  },
  textInput: {
    borderWidth: 2,
    width: '90%',
    height: 150,
    fontSize: 18,
    padding: 8,
    textAlignVertical: 'top',
  },
  landscapeTextInput: {
    flex: 1,
    width: undefined,
    height: 100,
  },
  button: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    marginTop: 20,
    backgroundColor: "#DDA0DD",
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    height: 30,    
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#00008B",
  },
  feedbackItem: {
    margin: 8,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#E6E6FA",
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    borderWidth: 2,  
    shadowColor: Platform.select({ ios: '#000000', android: undefined }),
    shadowOffset: Platform.select({ ios: { width: 0, height: 2 }, android: undefined }),
    shadowOpacity: Platform.select({ ios: 0.25, android: undefined }),
    shadowRadius: Platform.select({ ios: 3, android: undefined }),
    elevation: Platform.select({ android: 4, ios: undefined }),
  },
  feedbackList: {
    flex: 1,
  },
  feedbackListContent: {
    paddingBottom: 24,
  },
});
