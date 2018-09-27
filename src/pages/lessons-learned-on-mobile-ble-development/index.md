---
title: "Lessons learned from building a mobile app with Bluetooth Low Energy support"
date: "2017-03-17T23:46:37.121Z"
---

![](https://cdn-images-1.medium.com/max/800/1*5poGnoitx0bH7zTn29LxcA.png)

I’ve spent a couple of months working in a project where BLE support is critical
for the client’s business as an android developer, side-by-side with an iOS
developer. It was my first experience with BLE, and I have learned a couple of
things that I want to share with anyone that’s going in the same path.

### Classic Bluetooth vs Bluetooth Low Energy

This is the very first thing you will ask yourself if, like me, you are not
familiar with this technology. Basically, they are wireless communication
technologies that allow devices to transmit data between them. One of the
devices will take the “central” role, and the other one the “peripheral” mode.
The **Bluetooth 4.0** standard allows operating in both or any of these two
implementations. Here are some of the differences between them:

#### Classic Bluetooth

* Created to transfer data wirelessly between short-range devices.
* It can transfer a big amount of data, but it consumes much more energy to do so.
* Common use cases: Audio streaming to headsets, file transfers, wireless
speakers, connecting your smartphone to a car stereo system, etc.
* Engineering details: it operates at frequencies between 2402 and 2480 MHz, or
2400 and 2483.5 MHz including [guard
bands](https://en.wikipedia.org/wiki/Guard_band) 2 MHz wide at the bottom end
and 3.5 MHz wide at the top.

#### Bluetooth Low Energy

* Also called “Bluetooth Smart” by the industry, it was introduced in Bluetooth
4.0.
* It’s design to drastically reduce power consumption, and to transfer small
amounts of data.
* Common use cases: Especially interesting in the IoT world, it can be used in
accessories like blood pressure monitors, glucose monitors, heart rate monitor,
industrial monitoring sensors, proximity sensors (read about iBeacons), etc.
* Engineering details: Bluetooth Smart technology operates in the same spectrum
range (the 2.400–2.4835 GHz ISM band) as Classic Bluetooth technology, but uses
a different set of channels. Instead of the Classic Bluetooth 79 1-MHz channels,
Bluetooth Smart has 40 2-MHz channels.

### Some details on BLE

BLE has been supported in iPhones since iOS 5, and in Android since version 4.3.
Information in BLE peripherals is displayed in something we call
“Characteristics”. Each characteristic contains a small piece of data.
Characteristics are the main point that you will interact with your BLE
peripheral. For example, one characteristic may contain the devices’s battery
level data. Characteristics are contained in what we call a “Service”. Both
services and characteristics are identified by a UUID. So, a BLE peripheral
contains one or more services, and each service one or more characteristics. You
can read values, set values and subscribe to receive value updates of the
characteristics you want.

Also, a **BLE peripheral device can only be connected to one central device at a
time. **As soon as a peripheral connects to a central device, it will stop
advertising itself and other devices will no longer be able to see it or connect
to it until the existing connection ends.

### Lessons learned

* If you don’t need to transfer huge amounts of data, go with BLE instead of
classic Bluetooth.

#### Android

* Android BLE support is relatively new, it was introduced in version 4.3 and it
uses scanning methods that later got deprecated. In version 4.4 there are still
a couple of critical bugs. For instance, if you try to perform a scan,
specifying a filter by Service UUID (devices that expose that service) it might
not work at all. The 4.4 android platform is full of Bluetooth bugs especially
in Nexus devices, read more about this
[here](https://code.google.com/p/android/issues/detail?id=63056). I’d recommend
staying away from these android versions and start clean from Android 5
(Lollipop) or newer if you don’t want to deal with all these platform bugs.
* Android fragmentation is horribly bad. Each manufacturer sets different hardware
for each smartphone and it is a big deal for BLE apps. For instance if you’re
planning on performing some kind of operation based on signal strength
measurement (RSSI), you should know that different smartphones will receive
different values of signal strength even if they’re at the same distance of the
peripheral. I’d recommend trying to define a finite spectrum of devices you’re
targeting your app.
* Android lower level API is not well documented. Yes, you can go to [the official
docs](https://developer.android.com/guide/topics/connectivity/bluetooth-le.html)
and setup your ideal code to support BLE transactions. The documentations on
this side are ok. The real problems in a lower level, when the device notifies
your app that there has been some kind of error, within the
“[onConnectionStateChange(BluetoothGatt gatt, int status, int
newState)](https://developer.android.com/reference/android/bluetooth/BluetoothGattCallback.html#onConnectionStateChange(android.bluetooth.BluetoothGatt,
int, int))” method. Sometimes you’ll get weird status codes like 133, 19, etc.
that are not documented at all. Sometimes they are related to hardware issues,
connectivity issues, specific hardware in some devices, and sometimes you really
can’t be sure what it is. All these things make BLE development a little
frustrating in Android.
* Google lets you fully control the Bluetooth service status of the device (you
can turn it on or off). If you use this the wrong way, the user will see it as
invasive and will most likely uninstall the app. However, this feature is
especially useful if your peripheral will change its Services or Characteristics
at any time. Why would you need to restart the smartphone’s bluetooth service ?
Well, in this particular case, if the peripheral changes its characteristics for
any reason, Android will not be able to see the changes. Services and
Characteristics are heavily stored in some kind of caché memory, and only if you
restart the service you’ll see the changes reflected on your app. You could also
use reflection for this, but I wouldn’t recommend it.
* You can setup a background connection, or value-reading process within a classic
Android Service with no problems at all.

#### iOS

Even though I’m not an iOS developer, I’m learning this technology and I can
also mention a couple of things that I got from my project.

* As I said before, Android lets you run a task inside a Service such as scanning
and connecting to a BLE peripheral. In contrast, Apple does not let iOS
developers to run just anything in background state, but only specific features
such as “playing audio”, “location updates”, “background fetch”, “BLE
operations” and some others. All these features are disabled by default and
you’ll have to enable them in XCode manually. The iOS background execution mode
is much more restricted than foreground mode in a way that you’re app will
mostly be reacting to external events, instead of initiating transactions.
Apple’s documentation specifies that when your app is in background mode, it
will still receive peripheral updates, but should not take more than 10 seconds
to process this data. You should really do further research on this if you’re
planning on building an iOS app with background BLE support.
* Since Obj-C / Swift compile to a lower level object code (machine-level code)
than Java does (byte-code), you can expect some features to run slightly faster,
such as Characteristic value reading or writing. I’m talking about a difference
of few milliseconds. So unless you’re planning on transferring a **lot** of data
through bluetooth, this will not represent a problem to you.

### Conclusion

Developing mobile apps with BLE support is not an easy task, but it is a
**possible** task. Try to really understand how this technology works before you
start coding. This also means you should know what kind of limitations you’ll
face within Android and iOS, so you get an idea about the technical feasibility
of your product. If you know the rules, you’ll be able to build a complex (and
awesome) bluetooth-capable app.
