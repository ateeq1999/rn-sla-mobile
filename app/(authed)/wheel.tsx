import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { Svg, G, Circle, Text as SvgText } from 'react-native-svg';

const SEGMENTS = [
    '🍹 Free Drink',
    '🎁 10% Off',
    '🍰 Dessert',
    '❌ Try Again',
    '🥗 Free Salad',
    '🍕 Pizza Slice'
];

const colors = ['#f87171', '#facc15', '#34d399', '#60a5fa', '#fbbf24', '#a78bfa'];

export default function WheelScreen() {
    const spinAnim = useRef(new Animated.Value(0)).current;
    const [selected, setSelected] = useState<string | null>(null);

    const spin = () => {
        const segmentAngle = 360 / SEGMENTS.length;
        const winnerIndex = Math.floor(Math.random() * SEGMENTS.length);
        const rotation = 360 * 5 + winnerIndex * segmentAngle + segmentAngle / 2;

        Animated.timing(spinAnim, {
            toValue: rotation,
            duration: 3000,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start(() => {
            setSelected(SEGMENTS[winnerIndex]);
        });
    };

    const interpolatedRotate = spinAnim.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg']
    });

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-xl font-bold mb-6">🎉 Spin to Win!</Text>

            <Animated.View style={{ transform: [{ rotate: interpolatedRotate }] }}>
                <Svg height="300" width="300" viewBox="0 0 300 300">
                    <G origin="150, 150">
                        {SEGMENTS.map((label, index) => {
                            const startAngle = (360 / SEGMENTS.length) * index;
                            const endAngle = startAngle + (360 / SEGMENTS.length);
                            const midAngle = (startAngle + endAngle) / 2;
                            const x = 150 + 100 * Math.cos((midAngle * Math.PI) / 180);
                            const y = 150 + 100 * Math.sin((midAngle * Math.PI) / 180);

                            return (
                                <G key={index}>
                                    <Circle
                                        cx="150"
                                        cy="150"
                                        r="120"
                                        stroke={colors[index % colors.length]}
                                        strokeWidth={60}
                                        strokeDasharray={`${Math.PI * 2 * 120 * (1 / SEGMENTS.length)} ${Math.PI * 2 * 120}`}
                                        strokeDashoffset={-index * Math.PI * 2 * 120 * (1 / SEGMENTS.length)}
                                        fill="none"
                                    />
                                    <SvgText
                                        x={x}
                                        y={y}
                                        fill="#000"
                                        fontSize="12"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                    >
                                        {label}
                                    </SvgText>
                                </G>
                            );
                        })}
                    </G>
                </Svg>
            </Animated.View>

            <TouchableOpacity
                onPress={spin}
                className="mt-8 bg-blue-500 px-6 py-3 rounded-full"
            >
                <Text className="text-white font-semibold">Spin</Text>
            </TouchableOpacity>

            {selected && (
                <View className="mt-6 p-4 bg-green-100 rounded-lg">
                    <Text className="text-lg font-semibold text-green-700">🎉 You won: {selected}!</Text>
                </View>
            )}
        </View>
    );
}
