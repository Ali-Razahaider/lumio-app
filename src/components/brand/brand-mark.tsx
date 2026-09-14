import { StyleSheet, View } from "react-native";

type BrandMarkProps = {
   size?: number;
   light?: boolean;
};

export function BrandMark({ size = 56, light = false }: BrandMarkProps) {
   const pageColor = light ? "#FFFFFF" : "#152235";
   const backgroundColor = light ? "#2477D4" : "#E7F1FC";

   return (
      <View
         style={[
            styles.mark,
            {
               width: size,
               height: size,
               borderRadius: size * 0.28,
               backgroundColor,
            },
         ]}
      >
         <View
            style={[
               styles.page,
               styles.leftPage,
               {
                  width: size * 0.25,
                  height: size * 0.48,
                  backgroundColor: pageColor,
               },
            ]}
         />
         <View
            style={[
               styles.page,
               styles.rightPage,
               {
                  width: size * 0.25,
                  height: size * 0.48,
                  backgroundColor: pageColor,
               },
            ]}
         />
         <View
            style={[
               styles.sun,
               {
                  width: size * 0.14,
                  height: size * 0.14,
                  borderRadius: size * 0.07,
               },
            ]}
         />
         <View
            style={[
               styles.spine,
               { width: Math.max(2, size * 0.035), height: size * 0.36 },
            ]}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   mark: {
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
   },
   page: {
      position: "absolute",
      bottom: "19%",
      borderRadius: 5,
   },
   leftPage: {
      left: "27%",
      transform: [{ rotate: "-16deg" }],
   },
   rightPage: {
      right: "27%",
      transform: [{ rotate: "16deg" }],
   },
   spine: {
      position: "absolute",
      bottom: "19%",
      borderRadius: 2,
      backgroundColor: "#F2B84B",
   },
   sun: {
      position: "absolute",
      top: "20%",
      backgroundColor: "#F2B84B",
   },
});
