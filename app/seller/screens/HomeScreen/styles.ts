import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  loadingFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 10,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  centerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 15,
  },
  errorText: {
    fontSize: 16,
    color: '#ff4444',
    textAlign: 'center',
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    gap: 10,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  topBar: { padding: 16, paddingBottom: 0, backgroundColor: "#fff" },
searchSection: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#f2f2f7",
  borderRadius: 12,
  paddingHorizontal: 12,
  marginBottom: 10,
},
searchInput: {
  flex: 1,
  fontSize: 16,
  paddingVertical: 8,
  marginLeft: 8,
  color: "#333",
},
filterButton: {
  backgroundColor: "#FD7E14",
  borderRadius: 8,
  padding: 6,
  marginLeft: 8,
},
filterTabs: {
  flexDirection: "row",
  marginTop: 8,
  marginBottom: 8,
},
tabButton: {
  backgroundColor: "#f8f9fa",
  borderRadius: 20,
  paddingHorizontal: 20,
  paddingVertical: 8,
  marginRight: 8,
},
tabActive: {
  backgroundColor: "#fd7e14",
},
tabText: {
  fontSize: 14,
  color: "#444",
  fontWeight: "500",
},
tabTextActive: {
  color: "#fff",
  fontWeight: "700",
},
});

export default styles;