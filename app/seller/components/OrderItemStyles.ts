import { StyleSheet } from "react-native";

export default StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  bookCover: {
    width: 70,
    height: 100,
    borderRadius: 6,
    marginRight: 16,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  price: {
    fontSize: 16,
    color: '#1E90FF',
    fontWeight: '600',
    marginVertical: 4,
  },
  buyer: {
    fontSize: 14,
    color: '#555',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
    marginTop: 6,
  },
  statusText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  orderId: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 4,
  },
});