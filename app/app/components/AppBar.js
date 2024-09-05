import React from 'react';
import { Appbar, DefaultTheme, Text, ThemeProvider, configureFonts } from 'react-native-paper';

const AppBar = ({ title, navigation, action, noBack }) => {
  return (
    <Appbar.Header style={{ backgroundColor: "#FFFFFF" }}>
      {!noBack && <Appbar.BackAction color='#1E5154' onPress={() => navigation.goBack()} />}
      <Text variant='bold' style={{ fontSize: 18, color: "#1E5154" }}>{title}</Text>
      {action}
    </Appbar.Header>
  );
};

export default AppBar;
