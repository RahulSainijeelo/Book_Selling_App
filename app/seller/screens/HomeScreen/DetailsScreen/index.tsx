import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Button } from 'react-native';
const productImages = [
  'https://static.nike.com/a/images/t_prod/w_640,c_limit,f_auto/c6944e2e-11a9-4002-884b-f6a1d5a4ba59/air-jordan-1.jpg',
  'https://static.nike.com/a/images/t_prod/w_640,c_limit,f_auto/cb9f5b4a-ecaf-4fb9-acb0-9c9a62fb5804/air-jordan-1.jpg',
];
const productName = 'Nike Sportswear';
const orderDate = 'Feb 19, 2024';
const trackingId = '32UD457';
const buyerName = 'Emily Johnson';
const buyerAddress =
  'Jl. WR Supratman, Dsn Kanyuran - Pandatan, Pasuruan - Jawa Timur 67156';
const buyerPhone = '+62 812-3456-7890';
const productStatus: 'PAID' | 'SHIPPED' | 'AWAITING' = 'PAID';
const orderSummary = { price: 40, tax: 15, total: 55 };
const orderTimeline = [
  { label: 'Order Received', time: '7:29 am', highlight: true },
  { label: 'Awaiting Shipping', time: '5:40 am', highlight: true },
];

export default function OrderDetailsScreen() {
  const [status, setStatus] = useState(productStatus);

  const handleMarkAsShipped = () => {
    setStatus('SHIPPED');
  };

  const renderImageItem = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.productImage} />
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.card}>
        <Text style={styles.header}>ORDER ITEMS</Text>
        <FlatList
          data={productImages}
          horizontal
          keyExtractor={(uri, idx) => `${uri}-${idx}`}
          renderItem={renderImageItem}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 12 }}
        />

        {/* Product and Status */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionLabel}>PRODUCT</Text>
          <View
            style={[
              styles.statusBadge,
              status === 'PAID'
                ? styles.statusPaid
                : status === 'SHIPPED'
                ? styles.statusShipped
                : styles.statusAwaiting,
            ]}
          >
            <Text style={styles.statusBadgeText}>{status}</Text>
          </View>
        </View>
        <Text style={styles.prodName}>{productName}</Text>
        <Text style={styles.infoLabel}>Order Date</Text>
        <Text style={styles.infoText}>{orderDate}</Text>
        <Text style={styles.infoLabel}>Tracking ID</Text>
        <Text style={styles.infoText}>{trackingId}</Text>

        {/* Contact Section */}
        <Text style={[styles.sectionLabel, { marginTop: 18 }]}>CONTACT INFORMATION</Text>
        <View style={styles.contactRow}>
          <View>
            <Text style={styles.contactName}>{buyerName}</Text>
            <Text style={styles.contactAddress}>{buyerAddress}</Text>
            <Text style={styles.contactAddress}>{buyerPhone}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.card, { marginTop: 20 }]}>
        <Text style={styles.header}>ORDER SUMMARY</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Price</Text>
          <Text style={styles.summaryValue}>${orderSummary.price}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax</Text>
          <Text style={styles.summaryValue}>${orderSummary.tax}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Order Total</Text>
          <Text style={[styles.summaryValue, { fontWeight: 'bold' }]}>${orderSummary.total}</Text>
        </View>

        {/* Timeline */}
        <View style={{ marginTop: 24 }}>
          <Text style={styles.sectionLabel}>TIMELINE</Text>
          <Text style={styles.timelineDate}>{orderDate}</Text>
          {orderTimeline.map((step, idx) => (
            <View key={step.label + idx} style={styles.timelineRow}>
              <View style={[
                styles.timelineDot,
                step.highlight && styles.timelineDotHighlight
              ]} />
              <View>
                <Text
                  style={[
                    styles.timelineLabel,
                    step.highlight && { color: '#ff9900', fontWeight: '700' },
                  ]}
                >
                  {step.label}
                </Text>
                {step.time && <Text style={styles.timelineTime}>{step.time}</Text>}
              </View>
            </View>
          ))}
        </View>
        {status !== 'SHIPPED' && (
          <TouchableOpacity style={styles.shipButton} onPress={handleMarkAsShipped}>
            <Text style={styles.shipButtonText}>Mark as shipped</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    fontSize: 15,
    fontWeight: '700',
    color: '#232323',
    marginBottom: 12,
    letterSpacing: 1,
  },
  productImage: {
    width: 120,
    height: 130,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#eee',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
  },
  sectionLabel: {
    color: '#8c929d',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 6,
    marginTop: 8,
  },
  prodName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#232323',
    marginBottom: 6,
    marginTop: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
    marginTop: 2,
  },
  infoText: {
    fontSize: 13,
    color: '#232323',
    marginBottom: 7,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 3,
    borderRadius: 18,
  },
  statusPaid: {
    backgroundColor: '#16A085',
  },
  statusAwaiting: {
    backgroundColor: '#FFC300',
  },
  statusShipped: {
    backgroundColor: '#3498db',
  },
  statusBadgeText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
    fontSize: 13,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  contactName: {
    fontWeight: '600',
    fontSize: 15,
    color: '#232323',
  },
  contactAddress: {
    color: '#666',
    fontSize: 13,
    marginTop: 2,
  },
  editText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#888',
  },
  summaryValue: {
    fontSize: 15,
    color: '#232323',
  },
  timelineDate: {
    color: '#828993',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 4,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  timelineDotHighlight: {
    backgroundColor: '#fb8c00',
  },
  timelineLabel: {
    fontSize: 14,
    color: '#232323',
  },
  timelineTime: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 2,
  },
  shipButton: {
    marginTop: 22,
    backgroundColor: '#ff7200',
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: 'center',
  },
  shipButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
