import React from 'react';
import { Appbar, DefaultTheme, ThemeProvider, configureFonts } from 'react-native-paper';

const AppBar = ({ title, navigation, action, noBack }) => {
  return (
    <Appbar.Header style={{backgroundColor: "#1E5154"}}>
      {!noBack && <Appbar.BackAction color='#FFFFFF' onPress={() => navigation.goBack()} />}
      <Appbar.Content color='white' title={title} />
        {action}
    </Appbar.Header>
  );
};

export default AppBar;
