import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Alert,
    Image,
    TextInput,
    ScrollView,
    ActivityIndicator,
    FlatList
} from 'react-native';

export default class Product extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            data: []
        };
    }

    renderItem = ({item}) => {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {item.product_cust_id}
                </Text>
                <Text style={styles.text}>
                    {item.name}
                </Text>
            </View>
        );
    };

    componentDidMount = () => {
        this.doGetProductList();
    };

    doGetProductList = async () => {
        this.setState({
            isLoading: true,
        });

        const formData = new FormData();
        formData.append('user_name', 'dcadmin3');
        formData.append('user_pass', '1234');

        try {
            let response = await fetch(
                'http://dcthai.dyndns.biz:9150/oui/pages/test_api/erp_product_list.php',
                {
                    method: 'POST',
                    body: formData,
                },
            );

            if (response.status !== 200) {
                alert('เกิดข้อผิดพลาดในการเชื่อมต่อเครือข่าย');
                this.setState({
                    isLoading: false,
                });
                return;
            }

            let responseJson = await response.json();
            //alert(JSON.stringify(responseJson));

            if (responseJson.login_result == null) {
                alert('เกิดข้อผิดพลาดในการเชื่อมต่อเครือข่าย');
            } else if (responseJson.login_result === '0') {
                alert('Username หรือ Password ไม่ถูกต้อง');
            } else if (responseJson.login_result === '1') {
                const productList = responseJson.product_list;
                this.setState({
                    data: productList
                });
            }

            this.setState({
                isLoading: false,
            });
        } catch (error) {
            console.error(error);
            alert('ผิดพลาด: ' + error);

            this.setState({
                isLoading: false,
            });
        }
    };

    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },

    text: {
        fontFamily: 'DBHeavent',
        fontSize: 25,
    },
});
