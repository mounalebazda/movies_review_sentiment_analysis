from flask import Flask, render_template, request, jsonify
import json
import pickle

# Load the Naive Bayes model and TfidfVectorizer object from disk
filename = 'Movies_Review_Classification.pkl'
classifier = pickle.load(open(filename, 'rb'))
cv = pickle.load(open('count-Vectorizer.pkl', 'rb'))

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        message = request.form['message']
        data = [message]
        vect = cv.transform(data).toarray()
        prediction = classifier.predict(vect)
        # return jsonify({'prediction': str(prediction[0])})
        return render_template('result.html', prediction=prediction)
        


if __name__ == "__main__":
    app.run(debug=True)
