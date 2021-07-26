import React from 'react'
import { StatusBar, StyleSheet, useColorScheme, Text, View, Button } from 'react-native'
import { PESDK } from 'react-native-photoeditorsdk'
import { ImageExportType } from 'react-native-photoeditorsdk'


const editor = async () => {
  let image = require('./react-logo.png')
  const configuration = {
    export: {
      image: {
        exportType: ImageExportType.DATA_URL,
      },
    },
  }
  const response = await PESDK.openEditor(image, configuration)

  if (response) {
    // The issues is only on iOS. Tested on the simulator, iPhone 12, ios 14.5. Android behaves ok. 
    // EXPECTED: format of response.image is "file:///"
    // ACTUAL:   FORMAT of response.image is "data:image/png;base64..."
    console.log(response.image)
  }
}

const App = () => {
  return (
    <View style={styles.container}>
      <Button
        title="Edit Image"
        onPress={() => {
          editor()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default App
