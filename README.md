# React Native Wheel DatePicker

A customizable, smooth, and haptic-enabled **wheel-style date picker** for React Native.
It uses `FlatList` to simulate iOS-style scroll wheels, wrapped inside a bottom sheet for a modern UI.

---

## 📷 Preview

<img width="252" height="237" alt="Screenshot 2025-09-19 at 5 42 01 PM" src="https://github.com/user-attachments/assets/055830f5-ebd2-4a15-98f1-bb5f2c540bcc" />

---

## ✨ Features

- 🎡 **Wheel-style picker** for days, months, and years
- 📱 **Cross-platform** (iOS & Android)
- 🎨 **Customizable** colors & text styles
- 📳 **Haptic feedback** for better UX
- 📅 **Initial date support**
- 🔒 **Min/Max date support** to restrict selectable range
- 📦 Built with `react-native-raw-bottom-sheet`

---

## 📌 Which package should I install?

We provide two separate packages so you can choose based on your project requirements:

| Requirement                                                       | Recommended Package                                                                                               |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| You only need a **date picker** (day, month, year)                | 📦 [`react-native-rb-wheel-datepicker`](https://www.npmjs.com/package/react-native-rb-wheel-datepicker)           |
| You need both **date & time picker** (date + hour/minute + AM/PM) | 📦 [`react-native-rb-wheel-datetime-picker`](https://www.npmjs.com/package/react-native-rb-wheel-datetime-picker) |

👉 If you only need date selection, we recommend installing the lighter package [react-native-rb-wheel-datepicker](https://www.npmjs.com/package/react-native-rb-wheel-datepicker).

👉 If you need both date and time selection, install [react-native-rb-wheel-datetime-picker](https://www.npmjs.com/package/react-native-rb-wheel-datetime-picker).

---

## 📦 Installation

```sh
npm install react-native-rb-wheel-datepicker
```

or with yarn:

```sh
yarn add react-native-rb-wheel-datepicker
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
import DatePicker from "react-native-rb-wheel-datepicker";

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
        minDate={new Date(2020, 0, 15)} // Jan 15, 2020
        maxDate={new Date(2026, 11, 20)} // Dec 20, 2026
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

| Prop                   | Type                   | Default         | Description                                                            |
| ---------------------- | ---------------------- | --------------- | ---------------------------------------------------------------------- |
| `title`                | `string`               | `"Select Date"` | Title text shown at the top                                            |
| `isVisible`            | `boolean`              | `false`         | Controls modal visibility                                              |
| `onClose`              | `() => void`           | **required**    | Called when modal is closed                                            |
| `onConfirm`            | `(date: Date) => void` | **required**    | Returns the selected date                                              |
| `initialDate`          | `Date`                 | `new Date()`    | Preselected date when opened                                           |
| `themeBackgroundColor` | `string`               | `"#FFFFFF"`     | Background color of the sheet                                          |
| `primaryColor`         | `string`               | `"#000000"`     | Highlight color for selected items & confirm button                    |
| `titleTextStyle`       | `TextStyle`            | `undefined`     | Custom style for the title text                                        |
| `itemTextStyle`        | `TextStyle`            | `undefined`     | Custom style for list items                                            |
| `minDate`              | `Date`                 | `undefined`     | Minimum selectable date (e.g. `new Date(2020, 0, 15)` → Jan 15, 2020)  |
| `maxDate`              | `Date`                 | `undefined`     | Maximum selectable date (e.g. `new Date(2026, 11, 20)` → Dec 20, 2026) |

---

## 📝 License

MIT © [CompileX](https://github.com/dhyey0101)
Feel free to contribute via pull requests.

---
