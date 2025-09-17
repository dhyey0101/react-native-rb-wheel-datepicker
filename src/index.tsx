import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import RBSheet from "react-native-raw-bottom-sheet";

const { width } = Dimensions.get("window");
const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;
const LIST_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
const PADDING = ((VISIBLE_ITEMS - 1) / 2) * ITEM_HEIGHT;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = Array.from({ length: 200 }, (_, i) => 1950 + i);

function getDaysInMonth(month: number, year: number): number[] {
  const count = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: count }, (_, i) => i + 1);
}

const triggerHaptic = () => {
  ReactNativeHapticFeedback.trigger("selection", {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
};

export default function CustomWheelDatePicker({
  title,
  isVisible,
  onClose,
  onConfirm,
  initialDate,
  themeBackgroundColor = "#FFFFFF",
  primaryColor,
  titleTextStyle,
  itemTextStyle,
}: {
  title?: string;
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  initialDate?: Date;
  themeBackgroundColor?: string;
  primaryColor?: string;
  titleTextStyle?: TextStyle;
  itemTextStyle?: TextStyle;
}) {
  const sheetRef = useRef<RBSheet>(null);

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const lastDayIndex = useRef<number | null>(null);
  const lastMonthIndex = useRef<number | null>(null);
  const lastYearIndex = useRef<number | null>(null);

  const dayListRef = useRef<FlatList>(null);
  const monthListRef = useRef<FlatList>(null);
  const yearListRef = useRef<FlatList>(null);
  const didLayout = useRef(false);

  const scrollToInitialDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const yearIndex = years.findIndex((y) => y === year);

    InteractionManager.runAfterInteractions(() => {
      dayListRef.current?.scrollToIndex({ index: day - 1, animated: true });
      monthListRef.current?.scrollToIndex({ index: month, animated: true });
      yearListRef.current?.scrollToIndex({ index: yearIndex, animated: true });
    });
  };

  useEffect(() => {
    if (isVisible && initialDate) {
      const d = initialDate.getDate();
      const m = initialDate.getMonth();
      const y = initialDate.getFullYear();

      setSelectedDay(d);
      setSelectedMonth(m);
      setSelectedYear(y);
      setDaysInMonth(getDaysInMonth(m, y));

      didLayout.current = false;
      sheetRef.current?.open();
    } else {
      sheetRef.current?.close();
    }
  }, [isVisible, initialDate]);

  useEffect(() => {
    if (selectedMonth !== null && selectedYear !== null) {
      const updatedDays = getDaysInMonth(selectedMonth, selectedYear);
      setDaysInMonth(updatedDays);
      if (selectedDay !== null && selectedDay > updatedDays.length) {
        setSelectedDay(1);
      }
    }
  }, [selectedMonth, selectedYear]);

  const renderPicker = (
    data: string[] | number[],
    selectedValue: string | number,
    setValue: (val: any) => void,
    lastIndexRef: React.MutableRefObject<number | null>,
    listRef: React.RefObject<FlatList<any>>
  ) => (
    <FlatList
      ref={listRef}
      data={data}
      keyExtractor={(item) => item.toString()}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={{ paddingVertical: PADDING }}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate="fast"
      scrollEventThrottle={16}
      onScroll={(e) => {
        const offset = e.nativeEvent.contentOffset.y;
        const index = Math.round(offset / ITEM_HEIGHT);
        const value = data[index];

        if (index !== lastIndexRef.current && value !== selectedValue) {
          lastIndexRef.current = index;
          setValue(value);
          triggerHaptic();
        }
      }}
      onMomentumScrollEnd={(e) => {
        const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
        setValue(data[index]);
      }}
      renderItem={({ item }) => (
        <Text
          style={[
            styles.item,
            itemTextStyle,
            item === selectedValue && styles.selectedItem,
            {
              color: item === selectedValue ? primaryColor : "#a3a3a3",
              fontSize: item === selectedValue ? 18 : 14,
            },
          ]}
        >
          {item}
        </Text>
      )}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
    />
  );

  const handleConfirm = () => {
    if (selectedDay != null && selectedMonth != null && selectedYear != null) {
      const finalDate = new Date(selectedYear, selectedMonth, selectedDay);
      onConfirm(finalDate);
      onClose();
    }
  };

  return (
    <RBSheet
      ref={sheetRef}
      height={Platform.OS === "ios" ? LIST_HEIGHT + 145 : LIST_HEIGHT + 150}
      snapPoints={[LIST_HEIGHT + 200]}
      onClose={onClose}
      index={-1}
      customStyles={{
        container: {
          borderRadius: 13,
          width: width - 34,
          alignSelf: "center",
          marginBottom: Platform.OS === "ios" ? 30 : 10,
        },
      }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: themeBackgroundColor,
          },
        ]}
      >
        <Text style={[styles.title, titleTextStyle]}>
          {title ?? "Select Date"}
        </Text>
        <View
          style={styles.pickerContainer}
          onLayout={() => {
            if (!didLayout.current && isVisible && initialDate) {
              didLayout.current = true;
              scrollToInitialDate(initialDate); // no delay, no animation
            }
          }}
        >
          {selectedDay !== null &&
            renderPicker(
              daysInMonth,
              selectedDay,
              setSelectedDay,
              lastDayIndex,
              dayListRef
            )}
          {selectedMonth !== null &&
            renderPicker(
              months,
              months[selectedMonth],
              (val) => setSelectedMonth(months.indexOf(val)),
              lastMonthIndex,
              monthListRef
            )}
          {selectedYear !== null &&
            renderPicker(
              years,
              selectedYear,
              setSelectedYear,
              lastYearIndex,
              yearListRef
            )}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={onClose}
            style={[
              styles.buttonStyle,
              { borderWidth: 1, borderColor: primaryColor ?? "#000000" },
            ]}
          >
            <Text style={[styles.itemTextStyle, itemTextStyle]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleConfirm}
            style={[
              styles.buttonStyle,
              {
                borderWidth: 1,
                borderColor: primaryColor ?? "#000000",
                backgroundColor: primaryColor,
              },
            ]}
          >
            <Text
              style={[
                styles.itemTextStyle,
                itemTextStyle,
                { color: "#FFFFFF" },
              ]}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  list: {
    height: LIST_HEIGHT,
    width: 90,
  },
  item: {
    fontSize: 20,
    height: ITEM_HEIGHT,
    textAlign: "center",
    color: "#888",
  },
  selectedItem: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 24,
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: "row",
    gap: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  itemTextStyle: {
    color: "#000000",
  },
});
