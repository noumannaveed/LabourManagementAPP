import {
    Platform
} from 'react-native';
export const FontFamily={
    AlegreyaRoman_Bold: Platform.OS === 'ios' ? 'Alegreya-Bold' : "AlegreyaRoman-Bold",
    Alegreya_Bold: Platform.OS === 'ios' ? 'Alegreya-Bold' : "Alegreya-Bold",
    Alegreya_Regular: Platform.OS === 'ios' ? 'Alegreya-Regular' : "Alegreya-Regular",
    Alegreya_Medium: Platform.OS === 'ios' ? 'Alegreya-Medium' : "Alegreya-Medium",

}