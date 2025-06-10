import { TouchableOpacity, View, Text, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc';

export const CategoryCard = ({ item, selectedCategory, selectedSubcategory, navigation, closeItemsModal }) => (
  <TouchableOpacity 
    onPress={() => {
      navigation.navigate('WorkerDetails');
      closeItemsModal();
    }}
    key={item.id}
    style={[
      tw`bg-white rounded-2xl shadow-sm overflow-hidden mb-4 border border-gray-50`,
    ]}
  >
    {/* Testni baner / slika usluge */}
    <View style={tw`h-40 bg-gray-100 relative`}>
      <Image
        source={{ uri: item.banner }}
        style={tw`w-full h-full`}
        resizeMode="cover"
      />
      <View style={[tw`absolute top-3 right-3 bg-white px-2 py-1 rounded-lg shadow-sm`]}>
        <Text style={[tw`text-blue-500`, { fontFamily: 'Mont-Bold' }]}>{(item.price).toLocaleString(void 0, { maxiumumFractionDigits: 2 })} RSD</Text>
      </View>
    </View>

    {/* Tekstualni sadržaj */}
    <View style={tw`p-4`}>
      <View style={tw`flex-row items-center mb-2`}>
        <View style={[
          tw`h-6 w-6 rounded-full mr-2 flex items-center justify-center`, 
          selectedCategory && { backgroundColor: selectedCategory.color }
        ]}>
          {selectedCategory && (
            <Image
              style={tw`h-3 w-3`}
              source={{ uri: `https://backend.davidtesla.online/uploads/${selectedCategory.icon}` }}
            />
          )}
        </View>
        <Text style={[tw`text-xs text-gray-500`, { fontFamily: 'Mont-Medium' }]}>
          {selectedSubcategory ? selectedSubcategory.title : selectedCategory?.title}
        </Text>
      </View>

      <Text style={[tw`text-lg mb-1`, { fontFamily: 'Mont-SemiBold' }]}>
        {selectedSubcategory 
          ? `${selectedSubcategory.title} - Premium usluga ${item}` 
          : `${selectedCategory?.title} - Premium usluga ${item}`}
      </Text>

      <Text style={[tw`text-sm text-gray-500 mb-3`, { fontFamily: 'Mont-Regular' }]}>
        Profesionalna usluga vrhunskog kvaliteta sa garancijom zadovoljstva.
      </Text>

      {/* Ocene i dugme */}
      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center`}>
          <AntDesign name="star" size={14} color="#FFB800" />
          <Text style={[tw`text-sm ml-1`, { fontFamily: 'Mont-Medium' }]}>4.{item.id + 4}</Text>
          <Text style={[tw`text-sm text-gray-400 ml-1`, { fontFamily: 'Mont-Regular' }]}>
            ({Math.floor(Math.random() * 200) + 100} ocena)
          </Text>
        </View>
        <TouchableOpacity style={tw`bg-blue-500 py-2 px-4 rounded-lg`}>
          <Text style={[tw`text-white`, { fontFamily: 'Mont-Medium' }]}>Zakaži majstora</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);
