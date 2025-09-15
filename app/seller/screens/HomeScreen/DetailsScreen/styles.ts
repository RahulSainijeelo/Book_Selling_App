import { StyleSheet } from "react-native";

export default StyleSheet.create({
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