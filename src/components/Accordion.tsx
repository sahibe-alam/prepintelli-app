import React, {useState, ReactNode} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
} from 'react-native';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

interface AccordionItemProps {
  title: string;
  children: ReactNode; // Define children as ReactNode type
}

const AccordionItem: React.FC<AccordionItemProps> = ({title, children}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={{marginVertical: 10}}>
      <TouchableOpacity onPress={toggleAccordion}>
        <View
          style={{flexDirection: 'row', padding: 10, backgroundColor: '#eee'}}>
          <Text style={{fontWeight: 'bold', flex: 1}}>{title}</Text>
          <Text>{expanded ? '-' : '+'}</Text>
        </View>
      </TouchableOpacity>
      {expanded && (
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: '#ddd',
          }}>
          {children}
        </View>
      )}
    </View>
  );
};

export default AccordionItem;
