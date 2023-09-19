import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signup = async (email, password, name) => {
    const fcmToken = await messaging().getToken();
    console.log(fcmToken);
    return new Promise((resolve, reject) => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (user) => {
                try {
                    await AsyncStorage.setItem(
                        'uid',
                        JSON.stringify(user),
                    );
                } catch (error) {
                    // Error saving data
                }
                firestore()
                    .collection('Users')
                    .doc(user.user.uid)
                    .set({
                        name: name,
                        email: email,
                        fcmtoken: fcmToken,
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        image: '',
                    })
                    .then(() => {
                        console.log('User added!');
                    });
                console.log('uid=', user.user.uid);
                resolve({ status: true, user: user });
            })
            .catch(error => {
                console.log(error);
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    reject({ status: false, error: "That email address is already in use!" });
                } else if (error.code === 'auth/network-request-failed') {
                    console.log('Connection Error!');
                    reject({ status: false, error: "Connection Error!" });
                }
            });
    })
};

export const signout = async () => {
    let value = await AsyncStorage.getItem('uid');
    let parse = JSON.parse(value);
    await AsyncStorage.clear();
    console.log('value=', parse.user.uid);
    firestore()
        .collection('Users')
        .doc(parse.user.uid)
        .update({
            fcmtoken: 'null',
        })
        .then(() => {
            console.log('token deleted');
            return new Promise((resolve, reject) => {
                auth()
                    .signOut()
                    .then(async () => {
                        console.log('User signed out!');
                        resolve({ status: true })
                    })
                    .catch(error => {
                        reject({ status: false })
                    })
            })
        });

};

export const login = async (email, password) => {
    const fcmToken = await messaging().getToken();
    console.log('Token=', fcmToken);
    return new Promise((resolve, reject) => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (user) => {
                try {
                    firestore()
                        .collection('Users')
                        .doc(user.user.uid)
                        .get()
                        .then(async (us) => {
                            let user = us.data()
                            user = {
                                ...user,
                                id: us.id
                            }
                            if (us) {
                                await AsyncStorage.setItem(
                                    'user',
                                    JSON.stringify(user)
                                );
                            }
                        })
                    await AsyncStorage.setItem(
                        'uid',
                        JSON.stringify(user)
                    );

                } catch (error) {
                    // Error saving data
                }
                firestore()
                    .collection('Users')
                    .doc(user.user.uid)
                    .update({
                        fcmtoken: fcmToken,
                    })
                    .then(() => {
                        console.log('token update');
                    });
                console.log('User account created & signed in!');
                resolve({ status: true, user: user });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    reject({ status: false, error: "That email address is already in use!" });
                } else if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    reject({ status: false, error: "That email address is invalid!" });
                } else if (error.code === 'auth/user-not-found') {
                    console.log('That email address is invalid!');
                    reject({ status: false, error: "That email address is invalid!" });
                } else if (error.code === 'auth/wrong-password') {
                    console.log('That email address is invalid!');
                    reject({ status: false, error: "Wrong password!" });
                } else if (error.code === 'auth/network-request-failed') {
                    console.log('Connection Error!');
                    reject({ status: false, error: "Connection Error!" });
                }
            });
    })
};

export const updateprofile = (id, name, check, image, prev) => {
    let url = ''
    return new Promise(async(resolve, reject) => {
        if (check === true) {
            try {
                if (prev != '') {
                    let imageRef = storage().refFromURL(prev);
                    imageRef.delete()
                }
                const uploadUri = image;
                let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
                await storage().ref(filename).putFile(uploadUri);
                url = await storage().ref(filename).getDownloadURL();
            } catch (error) {
                console.log('error=', error);
            }
        } else if (check === false) {
            url = image
        }
        const obj = {
            name: name,
            image: url,
        }
        firestore()
            .collection('Users')
            .doc(id)
            .update({
                name: name,
                image: url,
            })
            .then(() => {
                firestore()
                .collection('Users')
                .doc(id)
                .get()
                .then(data => {
                    alert('Land added')
                    console.log('Land Added!');
                    resolve({ status: true, data: data.data(), id: data.id })
                })
                    .catch(error => {
                        reject({ status: false })
                    })
            })
    })
};

export const addland = (id, name, area, rent, checked) => {
    const obj = {
        landname: name,
        landarea: area,
        landrent: rent,
        landtype: checked,
        isdeleted: false,
    }
    return new Promise((resolve, reject) => {
        firestore()
            .collection('Myland')
            .doc(id)
            .collection('Lands')
            .add({
                ...obj,
                createdAt: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                firestore()
                    .collection('Myland')
                    .doc(id)
                    .collection('Lands')
                    .get()
                    .then(data => {
                        const size = data.size
                        console.log('size=', size);
                        firestore()
                            .collection('Myland')
                            .doc(id)
                            .set({
                                total: size
                            })
                            .then(() => {
                                alert('Land added')
                                console.log('Land Added!');
                                resolve({ status: true })
                            })
                            .catch(error => {
                                reject({ status: false })
                            })
                    })
            })
    })
};

export const getland = (id) => {
    console.log('icidsncjkn=', id);
    let temp = []
    let count = 0

    return new Promise((resolve, reject) => {
        firestore()
            .collection('Myland')
            .doc(id)
            .collection('Lands')
            .get()
            .then((documentSnapShot) => {
                temp = []
                documentSnapShot.forEach((querySnapShot) => {
                    count++
                    if (querySnapShot.data().isdeleted === false) {
                        temp.push({
                            id: querySnapShot.id,
                            ...querySnapShot.data()
                        })
                        if (documentSnapShot.size === count) {
                            // console.log('temp=',temp);
                            resolve({ status: true, temp: temp })
                        }
                    }
                })
            })
    })
}

export const deleteland = (id, item) => {
    return new Promise((resolve, reject) => {
        firestore()
            .collection('Myland')
            .doc(id)
            .collection('Lands')
            .doc(item.id)
            .update({
                isdeleted: true
            })
            .then(() => {
                alert('Land deleted')
                console.log('Land Deleted!');
                resolve({ status: true })
            })
            .catch(error => {
                reject({ status: false })
            })
    })
};

export const addlabour = (id, name, labour, checked, price) => {
    const obj = {
        labourname: name,
        labourtype: labour,
        wagetype: checked,
        wageprice: price,
    }
    let check = ''
    return new Promise(async (resolve, reject) => {
        const doc = await firestore()
            .collection('Myland')
            .doc(id)
            .collection('Labour')
            .where('labourname', '==', name)
            .get()
        doc.forEach(data => {
            if (data.exists) {
                check = data.id
            }
        })
        if (check === '') {
            firestore()
                .collection('Myland')
                .doc(id)
                .collection('Labour')
                .add({
                    ...obj,
                    createdAt: firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    resolve({ status: true, error: 'Labour added!' })
                })
        } else {
            resolve({ status: true, error: 'Already added by this name!' })
        }
    })
};

export const landdetail = (id, land, crop, season, area) => {
    const obj = {
        cropType: crop,
        cropSeason: season,
        cropArea: area,
    }
    return new Promise((resolve, reject) => {
        firestore()
            .collection('Myland')
            .doc(id)
            .collection('Lands')
            .doc(land)
            .update({
                ...obj,
            })
            .then(() => {
                alert('Land added')
                console.log('Land added!');
                resolve({ status: true })
            })
            .catch(error => {
                reject({ status: false })
            })
    })
};

export const getlabour = (id, setNames, setDATA, setDATA1) => {
    console.log(id);
    let temp = []
    let temp1 = []
    let count = 0
    firestore()
        .collection('Myland')
        .doc(id)
        .collection('Labour')
        .get()
        .then((documentSnapShot) => {
            temp = []
            documentSnapShot.forEach((querySnapShot) => {
                count++
                temp.push({
                    label: querySnapShot.data().labourname,
                    value: {
                        ...querySnapShot.data(),
                        id: querySnapShot.id
                    }
                })
                // if (querySnapShot.data().wagetype === 'per day') {
                //     temp.push({
                //         label: querySnapShot.data().labourname,
                //         value: {
                //             ...querySnapShot.data(),
                //             id: querySnapShot.id
                //         }
                //     })
                // } else if (querySnapShot.data().wagetype === 'per month') {
                //     temp1.push({
                //         label: querySnapShot.data().labourname,
                //         value: {
                //             ...querySnapShot.data(),
                //             id: querySnapShot.id
                //         }
                //     })
                // }
                if (documentSnapShot.size === count) {
                    // console.log(temp);
                    setNames(temp)
                    // setDATA1(temp1)
                }
            })
            console.log('Labour loaded!');
        })
};

export const checkpresent = (user, id, type, name, price, temp) => {
    let expense = 0
    let days = 0
    let temp1 = []
    const labourId = name.value.id
    const obj = {
        expensetype: type,
        labourid: name.value.id,
        price: price,
        labourname: name.label
    }

    console.log('temp11=', temp.length);

    return new Promise(async (resolve, reject) => {
        for (var i = 0; i < temp.length; i++) {
            let col = temp[i].col
            let date1 = temp[i].date
            let dat = await firestore()
                .collection('Myland')
                .doc(user)
                .collection('Labour')
                .doc(labourId)
                .collection('Attendence')
                .doc(id)
                .collection(col)
                .doc(date1)
                .get()
            if (!dat.exists) {
                // alert('absent at that day')
            } else {
                if (dat.data().ispaid === false) {
                    days++
                    // alert(days)
                    temp1.push({
                        ...temp[i]
                    })
                }
            }
        }
        resolve({ temp1 })
    })
};

export const checkabsent = (user, id, type, name, price, date) => {
    let expense = 0
    let days = 0
    let temp1 = []
    const labourId = name.value.id
    const obj = {
        user: user,
        id: id,
        type: type,
        labourId: labourId,
        date: date.getMonth(),
        price: price,
        labourname: name.label
    }

    console.log(obj);

    return new Promise(async (resolve, reject) => {
        let col = (date.getMonth() + 1) + '-' + date.getFullYear()
        let dat = await firestore()
            .collection('Myland')
            .doc(user)
            .collection('Labour')
            .doc(labourId)
            .collection('Attendence')
            .doc(id)
            .collection(col)
            .doc(col)
            .get()
        if (!dat.exists) {
            alert('present whole month!')
            resolve({ temp1, days })
        } else if (dat.data().absent.length === 0 || dat.data().absent.length >= 0) {
            temp1 = dat.data().absent
            // if (dat.data().ispaid === false) {
            //     days++
            //     // alert(days)
            //     temp1.push({
            //         ...temp[i]
            //     })
            // }
        }
        resolve({ temp1, days })
    })
};

export const addpayment = (user, id, type, name, price, present, total) => {

    const obj = {
        expensetype: type,
        labourid: name.value.id,
        price: price,
        labourname: name.label
    }
    let labourId = name.value.id

    console.log('obj=', obj);

    return new Promise((resolve, reject) => {
        if (price < total) {
            reject({ status: false, error: "Given amount is less than the actual wage!" })
        } else if (price > total) {
            reject({ status: false, error: "Given amount is greater than the actual wage!" })
        } else if (present.length === 0) {
            reject({ status: false, error: "Not Present!" })
        } else {
            for (let i = 0; i < present.length; i++) {
                let date = present[i].date
                let col = present[i].col
                firestore()
                    .collection('Myland')
                    .doc(user)
                    .collection('Labour')
                    .doc(labourId)
                    .collection('Attendence')
                    .doc(id)
                    .collection(col)
                    .doc(date)
                    .update({
                        ispaid: true,
                    })
                    .then(() => {
                        firestore()
                            .collection('Expense')
                            .doc(id)
                            .collection('Expenses')
                            .add({
                                ...obj,
                                createdAt: firestore.FieldValue.serverTimestamp()
                            })
                            .then(() => {
                                firestore()
                                    .collection('Expense')
                                    .doc(id)
                                    .collection('Expenses')
                                    .get()
                                    .then(data => {
                                        const size = data.size
                                        console.log('size=', size);
                                        if (size === 1) {
                                            expense = obj.price
                                            firestore()
                                                .collection('Expense')
                                                .doc(id)
                                                .set({
                                                    totalcount: size,
                                                    totalexpense: expense,
                                                })
                                                .then(() => {
                                                    alert('Payment added')
                                                    console.log('Payment Added!');
                                                    resolve({ status: true })
                                                })
                                                .catch(error => {
                                                    reject({ status: false })
                                                })
                                        } else if (size > 1) {
                                            firestore()
                                                .collection('Expense')
                                                .doc(id)
                                                .get()
                                                .then((doc) => {
                                                    expense = parseInt(doc.data().totalexpense) + parseInt(obj.price)
                                                    console.log('expense=', parseInt(doc.data().totalexpense) + parseInt(obj.price));
                                                    firestore()
                                                        .collection('Expense')
                                                        .doc(id)
                                                        .set({
                                                            totalcount: size,
                                                            totalexpense: expense,
                                                        })
                                                        .then(() => {
                                                            alert('Payment added')
                                                            console.log('Payment Added!');
                                                            resolve({ status: true })
                                                        })
                                                        .catch(error => {
                                                            reject({ status: false })
                                                        })
                                                })
                                        }
                                    })
                            })
                    })
            }
        }
    })
};

export const addmonthpayment = (user, id, type, name, price, absent, total) => {

    const obj = {
        expensetype: type,
        labourid: name.value.id,
        price: total,
        labourname: name.label
    }
    let labourId = name.value.id
    return new Promise(async (resolve, reject) => {
        let col = absent
        let dat = await firestore()
            .collection('Myland')
            .doc(user)
            .collection('Labour')
            .doc(labourId)
            .collection('Attendence')
            .doc(id)
            .collection(col)
            .doc(col)
            .get()
        if (!dat.exists) {
            firestore()
                .collection('Myland')
                .doc(user)
                .collection('Labour')
                .doc(labourId)
                .collection('Attendence')
                .doc(id)
                .collection(col)
                .doc(col)
                .set({
                    absent: [],
                    ispaid: true,
                })
                .then(() => {
                    firestore()
                        .collection('Expense')
                        .doc(id)
                        .collection('Expenses')
                        .add({
                            ...obj,
                            createdAt: firestore.FieldValue.serverTimestamp()
                        })
                        .then(() => {
                            firestore()
                                .collection('Expense')
                                .doc(id)
                                .collection('Expenses')
                                .get()
                                .then(data => {
                                    const size = data.size
                                    console.log('size=', size);
                                    // {
                                    //     size === 1 ?
                                    //         expense = obj.price
                                    //         :
                                    //         firestore()
                                    //             .collection('Expense')
                                    //             .doc(id)
                                    //             .get()
                                    //             .then((doc) => {
                                    //                 expense = parseInt(doc.data().totalexpense) + parseInt(obj.price)
                                    //             })
                                    // }
                                    // firestore()
                                    //     .collection('Expense')
                                    //     .doc(id)
                                    //     .set({
                                    //         totalcount: size,
                                    //         totalexpense: expense,
                                    //     })
                                    //     .then(() => {
                                    //         alert('Payment added')
                                    //         console.log('Payment Added!');
                                    //         resolve({ status: true })
                                    //     })
                                    //     .catch(error => {
                                    //         reject({ status: false })
                                    //     })
                                    if (size === 1) {
                                        expense = obj.price
                                        firestore()
                                            .collection('Expense')
                                            .doc(id)
                                            .set({
                                                totalcount: size,
                                                totalexpense: expense,
                                            })
                                            .then(() => {
                                                alert('Payment added')
                                                console.log('Payment Added!');
                                                resolve({ status: true })
                                            })
                                            .catch(error => {
                                                reject({ status: false })
                                            })
                                    } else if (size > 1) {
                                        firestore()
                                            .collection('Expense')
                                            .doc(id)
                                            .get()
                                            .then((doc) => {
                                                expense = parseInt(doc.data().totalexpense) + parseInt(obj.price)
                                                console.log('expense=', parseInt(doc.data().totalexpense) + parseInt(obj.price));
                                                firestore()
                                                    .collection('Expense')
                                                    .doc(id)
                                                    .set({
                                                        totalcount: size,
                                                        totalexpense: expense,
                                                    })
                                                    .then(() => {
                                                        alert('Payment added')
                                                        console.log('Payment Added!');
                                                        resolve({ status: true })
                                                    })
                                                    .catch(error => {
                                                        reject({ status: false })
                                                    })
                                            })
                                    }
                                })
                        })
                })
        } else if (dat.data().ispaid === false && dat.exists) {
            firestore()
                .collection('Myland')
                .doc(user)
                .collection('Labour')
                .doc(labourId)
                .collection('Attendence')
                .doc(id)
                .collection(col)
                .doc(col)
                .update({
                    ispaid: true,
                })
                .then(() => {
                    firestore()
                        .collection('Expense')
                        .doc(id)
                        .collection('Expenses')
                        .add({
                            ...obj,
                            createdAt: firestore.FieldValue.serverTimestamp()
                        })
                        .then(() => {
                            firestore()
                                .collection('Expense')
                                .doc(id)
                                .collection('Expenses')
                                .get()
                                .then(data => {
                                    const size = data.size
                                    console.log('size=', size);
                                    // {
                                    //     size === 1 ?
                                    //         expense = obj.price
                                    //         :
                                    //         firestore()
                                    //             .collection('Expense')
                                    //             .doc(id)
                                    //             .get()
                                    //             .then((doc) => {
                                    //                 expense = parseInt(doc.data().totalexpense) + parseInt(obj.price)
                                    //             })
                                    // }
                                    // firestore()
                                    //     .collection('Expense')
                                    //     .doc(id)
                                    //     .set({
                                    //         totalcount: size,
                                    //         totalexpense: expense,
                                    //     })
                                    //     .then(() => {
                                    //         alert('Payment added')
                                    //         console.log('Payment Added!');
                                    //         resolve({ status: true })
                                    //     })
                                    //     .catch(error => {
                                    //         reject({ status: false })
                                    //     })
                                    if (size === 1) {
                                        expense = obj.price
                                        firestore()
                                            .collection('Expense')
                                            .doc(id)
                                            .set({
                                                totalcount: size,
                                                totalexpense: expense,
                                            })
                                            .then(() => {
                                                alert('Payment added')
                                                console.log('Payment Added!');
                                                resolve({ status: true })
                                            })
                                            .catch(error => {
                                                reject({ status: false })
                                            })
                                    } else if (size > 1) {
                                        firestore()
                                            .collection('Expense')
                                            .doc(id)
                                            .get()
                                            .then((doc) => {
                                                expense = parseInt(doc.data().totalexpense) + parseInt(obj.price)
                                                console.log('expense=', parseInt(doc.data().totalexpense) + parseInt(obj.price));
                                                firestore()
                                                    .collection('Expense')
                                                    .doc(id)
                                                    .set({
                                                        totalcount: size,
                                                        totalexpense: expense,
                                                    })
                                                    .then(() => {
                                                        alert('Payment added')
                                                        console.log('Payment Added!');
                                                        resolve({ status: true })
                                                    })
                                                    .catch(error => {
                                                        reject({ status: false })
                                                    })
                                            })
                                    }
                                })
                        })
                })
        } else if (dat.data().ispaid === true) {
            reject({ status: false, error: "Already Paid For this month!" })
        }
    })
};

export const addbuying = (id, type, buytype, price) => {
    let expense = 0
    const obj = {
        expensetype: type,
        buytype: buytype,
        price: price,
    }
    console.log('object=', obj);
    return new Promise((resolve, reject) => {
        firestore()
            .collection('Expense')
            .doc(id)
            .collection('Expenses')
            .add({
                ...obj,
                createdAt: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                firestore()
                    .collection('Expense')
                    .doc(id)
                    .collection('Expenses')
                    .get()
                    .then(data => {
                        const size = data.size
                        console.log('size=', size);
                        if (size === 1) {
                            expense = obj.price
                            firestore()
                                .collection('Expense')
                                .doc(id)
                                .set({
                                    totalcount: size,
                                    totalexpense: expense,
                                })
                                .then(() => {
                                    alert('Payment added')
                                    console.log('Payment Added!');
                                    resolve({ status: true })
                                })
                                .catch(error => {
                                    reject({ status: false })
                                })
                        } else if (size > 1) {
                            firestore()
                                .collection('Expense')
                                .doc(id)
                                .get()
                                .then((doc) => {
                                    expense = parseInt(doc.data().totalexpense) + parseInt(obj.price)
                                    console.log('expense=', parseInt(doc.data().totalexpense) + parseInt(obj.price));
                                    firestore()
                                        .collection('Expense')
                                        .doc(id)
                                        .set({
                                            totalcount: size,
                                            totalexpense: expense,
                                        })
                                        .then(() => {
                                            alert('Payment added')
                                            console.log('Payment Added!');
                                            resolve({ status: true })
                                        })
                                        .catch(error => {
                                            reject({ status: false })
                                        })
                                })
                        }
                    })
            })
    })
};

export const addother = (id, type, name, detail, price) => {
    let expense = 0
    const obj = {
        expensetype: type,
        name: name,
        detail: detail,
        price: price,
    }
    console.log('object=', obj);
    return new Promise((resolve, reject) => {
        firestore()
            .collection('Expense')
            .doc(id)
            .collection('Expenses')
            .add({
                ...obj,
                createdAt: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                firestore()
                    .collection('Expense')
                    .doc(id)
                    .collection('Expenses')
                    .get()
                    .then(data => {
                        const size = data.size
                        console.log('size=', size);
                        if (size === 1) {
                            expense = obj.price
                            firestore()
                                .collection('Expense')
                                .doc(id)
                                .set({
                                    totalcount: size,
                                    totalexpense: expense,
                                })
                                .then(() => {
                                    alert('Payment added')
                                    console.log('Payment Added!');
                                    resolve({ status: true })
                                })
                                .catch(error => {
                                    reject({ status: false })
                                })
                        } else if (size > 1) {
                            firestore()
                                .collection('Expense')
                                .doc(id)
                                .get()
                                .then((doc) => {
                                    expense = parseInt(doc.data().totalexpense) + parseInt(obj.price)
                                    console.log('expense=', parseInt(doc.data().totalexpense) + parseInt(obj.price));
                                    firestore()
                                        .collection('Expense')
                                        .doc(id)
                                        .set({
                                            totalcount: size,
                                            totalexpense: expense,
                                        })
                                        .then(() => {
                                            alert('Payment added')
                                            console.log('Payment Added!');
                                            resolve({ status: true })
                                        })
                                        .catch(error => {
                                            reject({ status: false })
                                        })
                                })
                        }
                    })
            })
    })
};

export const markattendence = (id, DATA, landId, date, setDATA, DATA1, setDATA1) => {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var col = month + '-' + year;
    // col = JSON.stringify(col)
    // date = JSON.stringify(date)
    const obj = {
        date: firestore.FieldValue.serverTimestamp(),
        present: true,
        ispaid: false
    }
    for (var i = 0; i < DATA.length; i++) {


        const data = DATA[i]
        const value = DATA[i]?.value?.id
        console.log('id=', value);

        firestore()
            .collection('Myland')
            .doc(id)
            .collection('Labour')
            .doc(DATA[i]?.value.id)
            .collection('Attendence')
            .doc(landId)
            .collection(col)
            .doc(date)
            .get()
            .then((doc) => {
                {
                    !doc.exists ?
                        (
                            firestore()
                                .collection('Myland')
                                .doc(id)
                                .collection('Labour')
                                .doc(value)
                                .collection('Attendence')
                                .doc(landId)
                                .collection(col)
                                .doc(date)
                                .set({
                                    ...obj
                                })
                                .then(() => {
                                    // console.log(DATA[i]);
                                    let temp = DATA1
                                    temp.push({
                                        ...data,
                                    })
                                    if (i === DATA.length) {
                                        setDATA1(temp)
                                        setDATA([])
                                        console.log('DATA1=', DATA1);
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        ) : (
                            console.log('Document data:', doc.data())
                        )
                }
                //     if (!doc.exists) {
                //         console.log('No such document exista!', DATA[i]?.value.id);

                //         firestore()
                //             .collection('Myland')
                //             .doc(id)
                //             .collection('Labour')
                //             .doc(value)
                //             .collection('Attendence')
                //             .doc(landId)
                //             .collection(col)
                //             .doc(date)
                //             .set({
                //                 ...obj
                //             })
                //             .then(() => {
                //                 // console.log(DATA[i]);
                //                 let temp = DATA1
                //                 temp.push({
                //                     ...data,
                //                 })
                //                 if (i === DATA.length) {
                //                     setDATA1(temp)
                //                     setDATA([])
                //                     console.log('DATA1=', DATA1);
                //                 }
                //             })
                //             .catch((error) => {
                //                 console.log(error);
                //             })
                //     } else {
                //         console.log('Document data:', doc.data());
                //     }
            })
            .catch((error) => {
                console.log(error);
            })
    }
};

export const markabsent = (id, name, landId, dates, setDATA, DATA1, setDATA1) => {
    // var month = new Date().getMonth() + 1;
    // var year = new Date().getFullYear();
    // var col = month + '-' + year;
    // col = JSON.stringify(col)
    // date = JSON.stringify(date)
    // const obj = {
    //     date: firestore.FieldValue.serverTimestamp(),
    //     absent: true,
    // }
    for (var i = 0; i < dates.length; i++) {


        const data = name
        const value = name?.value?.id
        const col = dates[i]?.col
        const date = dates[i].date
        console.log('id=', value);

        firestore()
            .collection('Myland')
            .doc(id)
            .collection('Labour')
            .doc(value)
            .collection('Attendence')
            .doc(landId)
            .collection(col)
            .doc(col)
            .get()
            .then((doc) => {
                {
                    !doc.exists ?
                        (
                            firestore()
                                .collection('Myland')
                                .doc(id)
                                .collection('Labour')
                                .doc(value)
                                .collection('Attendence')
                                .doc(landId)
                                .collection(col)
                                .doc(col)
                                .set({
                                    absent: firestore.FieldValue.arrayUnion(date),
                                    ispaid: false
                                })
                                .then(() => {
                                    // console.log(DATA[i]);
                                    if (i === dates.length--) {
                                        let temp = DATA1
                                        temp.push({
                                            ...data,
                                        })
                                        setDATA1(temp)
                                        setDATA([])
                                        console.log('DATA1=', DATA1);
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                })) : (
                            // console.log('Document data:', doc.data());
                            firestore()
                                .collection('Myland')
                                .doc(id)
                                .collection('Labour')
                                .doc(value)
                                .collection('Attendence')
                                .doc(landId)
                                .collection(col)
                                .doc(col)
                                .update({
                                    absent: firestore.FieldValue.arrayUnion(date)
                                })
                                .then(() => {
                                    // console.log(DATA[i]);
                                    if (i === dates.length--) {
                                        let temp = DATA1
                                        temp.push({
                                            ...data,
                                        })
                                        setDATA1(temp)
                                        setDATA([])
                                        console.log('DATA1=', DATA1);
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        )
                }
                // if (!doc.exists) {
                //     console.log('No such document exista!');
                //     firestore()
                //         .collection('Myland')
                //         .doc(id)
                //         .collection('Labour')
                //         .doc(value)
                //         .collection('Attendence')
                //         .doc(landId)
                //         .collection(col)
                //         .doc(col)
                //         .set({
                //             absent: firestore.FieldValue.arrayUnion(date),
                //             ispaid: false
                //         })
                //         .then(() => {
                //             // console.log(DATA[i]);
                //             if (i === dates.length--) {
                //                 let temp = DATA1
                //                 temp.push({
                //                     ...data,
                //                 })
                //                 setDATA1(temp)
                //                 setDATA([])
                //                 console.log('DATA1=', DATA1);
                //             }
                //         })
                //         .catch((error) => {
                //             console.log(error);
                //         })
                // } else {
                //     console.log('Document data:', doc.data());
                //     firestore()
                //         .collection('Myland')
                //         .doc(id)
                //         .collection('Labour')
                //         .doc(value)
                //         .collection('Attendence')
                //         .doc(landId)
                //         .collection(col)
                //         .doc(col)
                //         .update({
                //             absent: firestore.FieldValue.arrayUnion(date)
                //         })
                //         .then(() => {
                //             // console.log(DATA[i]);
                //             if (i === dates.length--) {
                //                 let temp = DATA1
                //                 temp.push({
                //                     ...data,
                //                 })
                //                 setDATA1(temp)
                //                 setDATA([])
                //                 console.log('DATA1=', DATA1);
                //             }
                //         })
                //         .catch((error) => {
                //             console.log(error);
                //         })
                // }
            })
        // .catch((error) => {
        //     console.log(error);
        // })
    }
};

export const getattendence = (id, landId, date) => {
    console.log(id);
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var col = month + '-' + year;
    // col = JSON.stringify(col)
    // date = JSON.stringify(date)
    let temp = []
    let temp1 = []
    let count = 0
    return new Promise((resolve, reject) => {
        firestore()
            .collection('Myland')
            .doc(id)
            .collection('Labour')
            .get()
            .then((documentSnapShot) => {
                temp = []
                documentSnapShot.forEach(async (querySnapShot) => {
                    count++
                    if (querySnapShot.data().wagetype === 'per day') {
                        const value = querySnapShot.id
                        let dat = await firestore()
                            .collection('Myland')
                            .doc(id)
                            .collection('Labour')
                            .doc(value)
                            .collection('Attendence')
                            .doc(landId)
                            .collection(col)
                            .doc(date)
                            .get()
                        if (!dat.exists) {
                            console.log('No such document exista!');
                            temp.push({
                                label: querySnapShot.data().labourname,
                                value: {
                                    ...querySnapShot.data(),
                                    id: querySnapShot.id
                                }
                            })
                        } else if (dat.exists) {
                            console.log('Document data:', dat.data());
                            temp1.push({
                                label: querySnapShot.data().labourname,
                                value: {
                                    ...querySnapShot.data(),
                                    id: querySnapShot.id
                                }
                            })
                        }
                    } else if (querySnapShot.data().wagetype === 'per month') {
                        const value = querySnapShot.id
                        firestore()
                            .collection('Myland')
                            .doc(id)
                            .collection('Labour')
                            .doc(value)
                            .collection('Attendence')
                            .doc(landId)
                            .collection(col)
                            .doc(col)
                            .get()
                            .then((document) => {
                                if (!document.exists) {
                                    temp1.push({
                                        label: querySnapShot.data().labourname,
                                        value: {
                                            ...querySnapShot.data(),
                                            id: querySnapShot.id
                                        }
                                    })
                                } else if (document.exists) {
                                    if (document.data()?.absent.indexOf(date) === -1) {
                                        temp1.push({
                                            label: querySnapShot.data().labourname,
                                            value: {
                                                ...querySnapShot.data(),
                                                id: querySnapShot.id
                                            }
                                        })
                                    }
                                }
                            })
                    }
                    if (documentSnapShot.size === count) {
                        // console.log(temp);
                        // setNames(temp)
                        console.log('temp=', temp);
                        // setDATA1(temp1)
                        resolve({ temp, temp1 })
                    }
                })
                console.log('Labour loaded!');
            })
    })
};

export const getactive = (id, landId, date) => {
    console.log(id);
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var col = month + '-' + year;
    // col = JSON.stringify(col)
    // date = JSON.stringify(date)
    let temp1 = []
    let count = 0
    return new Promise((resolve, reject) => {
        firestore()
            .collection('Myland')
            .doc(id)
            .collection('Labour')
            .get()
            .then((documentSnapShot) => {
                documentSnapShot.forEach(async (querySnapShot) => {
                    count++
                    if (querySnapShot.data().wagetype === 'per day') {
                        const value = querySnapShot.id
                        let dat = await firestore()
                            .collection('Myland')
                            .doc(id)
                            .collection('Labour')
                            .doc(value)
                            .collection('Attendence')
                            .doc(landId)
                            .collection(col)
                            .doc(date)
                            .get()
                        if (dat.exists) {
                            console.log('Document data:', dat.data());
                            temp1.push({
                                label: querySnapShot.data().labourname,
                                value: {
                                    ...querySnapShot.data(),
                                    id: querySnapShot.id
                                }
                            })
                        }
                    } else if (querySnapShot.data().wagetype === 'per month') {
                        const value = querySnapShot.id
                        firestore()
                            .collection('Myland')
                            .doc(id)
                            .collection('Labour')
                            .doc(value)
                            .collection('Attendence')
                            .doc(landId)
                            .collection(col)
                            .doc(col)
                            .get()
                            .then((document) => {
                                if (document.data()?.absent.indexOf(date) === -1 || !document.exists) {
                                    temp1.push({
                                        label: querySnapShot.data().labourname,
                                        value: {
                                            ...querySnapShot.data(),
                                            id: querySnapShot.id
                                        }
                                    })
                                }
                            })
                    }
                    if (documentSnapShot.size === count) {
                        // console.log(temp);
                        // setNames(temp)
                        // setDATA1(temp1)
                        resolve({ temp1 })
                    }
                })
                console.log('Labour loaded!');
            })
    })
};

export const getabsent = (id, setNames, setDATA, setDATA1, landId, date) => {
    console.log(id);
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var col = month + '-' + year;
    // col = JSON.stringify(col)
    // date = JSON.stringify(date)
    let temp = []
    let temp1 = []
    let count = 0
    date = new Date(date)
    date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    // date = new Date(date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear())
    console.log('date=', date);
    return new Promise(async (resolve, reject) => {
        firestore()
            .collection('Myland')
            .doc(id)
            .collection('Labour')
            .get()
            .then((documentSnapShot) => {
                temp = []
                documentSnapShot.forEach(async (querySnapShot) => {
                    count++
                    if (querySnapShot.data().wagetype === 'per month') {
                        const value = querySnapShot.id
                        let dat = await firestore()
                            .collection('Myland')
                            .doc(id)
                            .collection('Labour')
                            .doc(value)
                            .collection('Attendence')
                            .doc(landId)
                            .collection(col)
                            .doc(col)
                            .get()
                        if (!dat.exists) {
                            console.log('No such document exista!');
                            temp.push({
                                label: querySnapShot.data().labourname,
                                value: {
                                    ...querySnapShot.data(),
                                    id: querySnapShot.id
                                }
                            })
                        } else {
                            if (dat.data().absent.indexOf(date) != -1) {
                                console.log(dat.data().absent.indexOf(date));
                                temp1.push({
                                    label: querySnapShot.data().labourname,
                                    value: {
                                        ...querySnapShot.data(),
                                        id: querySnapShot.id
                                    }
                                })
                                console.log('Document data:', temp1);
                            } else if (dat.data().absent.indexOf(date) === -1) {
                                temp.push({
                                    label: querySnapShot.data().labourname,
                                    value: {
                                        ...querySnapShot.data(),
                                        id: querySnapShot.id
                                    }
                                })
                            }
                        }
                        if (documentSnapShot.size === count) {
                            console.log('temp=', temp);
                            // setNames(temp)
                            console.log('temp1=', temp1);
                            // setDATA1(temp1)
                            resolve({ temp1, temp })
                        }
                    }
                })
                console.log('Labour loaded!');
            })
    })
};

export const getreport = (landId) => {
    var wage = 0;
    var other = 0;
    var buying = 0;
    var sell = 0
    var count = 0;
    var count1 = 0;
    return new Promise(async (resolve, reject) => {
        firestore()
            .collection('Sell')
            .doc(landId)
            .collection('Sell')
            .get()
            .then((document) => {
                document.forEach(async (querySnap) => {
                    count1++
                    size1 = document.size
                    sell = sell + parseInt(querySnap.data().price)
                    if (document.size === count1) {
                        console.log('sell=', sell);
                    }
                })
                console.log('Labour loaded!');
            })
        firestore()
            .collection('Expense')
            .doc(landId)
            .collection('Expenses')
            .get()
            .then((documentSnapShot) => {
                documentSnapShot.forEach(async (querySnapShot) => {
                    count++
                    size = documentSnapShot.size
                    if (querySnapShot.data().expensetype === "labour payment") {
                        wage = wage + parseInt(querySnapShot.data().price)
                    } else if (querySnapShot.data().expensetype === "other") {
                        other = other + parseInt(querySnapShot.data().price)
                    } else if (querySnapShot.data().expensetype === "buy") {
                        buying = buying + parseInt(querySnapShot.data().price)
                    }
                    if (documentSnapShot.size === count) {
                        console.log('wage=', wage);
                        // setNames(temp)
                        console.log('other=', other);
                        console.log('buying=', buying);
                        resolve({ wage, other, buying, sell })
                        // setDATA1(temp1)
                        // resolve({ wage, other, buying, sell:0 })
                    }
                })
                console.log('Labour loaded!');
            })
    })
};

export const addsell = (landId, crop, price) => {
    const obj = {
        crop: crop,
        price: price
    }
    return new Promise(async (resolve, reject) => {
        firestore()
            .collection('Sell')
            .doc(landId)
            .collection('Sell')
            .add({
                ...obj,
                createdAt: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                resolve({ status: true })
            })
            .catch(error => {
                reject({ status: false })
            })
    })
};