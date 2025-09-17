# React Native Wheel DatePicker

A customizable, smooth, and haptic-enabled **wheel-style date picker** for React Native.
It uses `FlatList` to simulate iOS-style scroll wheels, wrapped inside a bottom sheet for a modern UI.

---

## ✨ Features

- 🎡 **Wheel-style picker** for days, months, and years
- 📱 **Cross-platform** (iOS & Android)
- 🎨 **Customizable** colors & text styles
- 📳 **Haptic feedback** for better UX
- 📅 **Initial date support**
- 📦 Built with `react-native-raw-bottom-sheet`

---

## 📦 Installation

```sh
npm install react-native-wheel-datepicker
```

or with yarn:

```sh
yarn add react-native-wheel-datepicker
```

Also install required peer dependencies:

```sh
npm install react-native-haptic-feedback react-native-raw-bottom-sheet
```

---

## 🚀 Usage

```tsx
import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import DatePicker from "react-native-wheel-datepicker";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Open Date Picker" onPress={() => setVisible(true)} />
      {date && <Text>Selected Date: {date.toDateString()}</Text>}

      <DatePicker
        title="Select your date"
        isVisible={visible}
        initialDate={new Date()}
        onClose={() => setVisible(false)}
        onConfirm={(selectedDate) => {
          setDate(selectedDate);
          setVisible(false);
        }}
        primaryColor="#007AFF"
        themeBackgroundColor="#fff"
      />
    </View>
  );
}
```

---

## ⚙️ Props

| Prop                   | Type                   | Default         | Description                                         |
| ---------------------- | ---------------------- | --------------- | --------------------------------------------------- |
| `title`                | `string`               | `"Select Date"` | Title text shown at the top                         |
| `isVisible`            | `boolean`              | `false`         | Controls modal visibility                           |
| `onClose`              | `() => void`           | **required**    | Called when modal is closed                         |
| `onConfirm`            | `(date: Date) => void` | **required**    | Returns the selected date                           |
| `initialDate`          | `Date`                 | `new Date()`    | Preselected date when opened                        |
| `themeBackgroundColor` | `string`               | `"#FFFFFF"`     | Background color of the sheet                       |
| `primaryColor`         | `string`               | `"#000000"`     | Highlight color for selected items & confirm button |
| `titleTextStyle`       | `TextStyle`            | `undefined`     | Custom style for the title text                     |
| `itemTextStyle`        | `TextStyle`            | `undefined`     | Custom style for list items                         |

---

## 📷 Preview

 ![Screenshot 2025-09-17 at 3 08 50 PM](https://github.com/user-attachments/assets/c6c4e1b2-1fcb-4f6e-9f70-7927fd68d06d)

---

## 📝 License

MIT © [CompileX](https://github.com/dhyey0101)
Feel free to contribute via pull requests.

---
