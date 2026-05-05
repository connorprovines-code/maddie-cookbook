"use client";

import { useState } from "react";
import { recipes } from "./recipes";

export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState("steps");
  const [completedSteps, setCompletedSteps] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  const toggleStep = (sectionIdx, stepIdx) => {
    const key = `${sectionIdx}-${stepIdx}`;
    setCompletedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleCheckItem = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const clearProgress = () => {
    setCompletedSteps({});
    setCheckedItems({});
  };

  const handleBack = () => {
    setSelectedRecipe(null);
    setActiveTab("steps");
    setCompletedSteps({});
    setCheckedItems({});
  };

  if (!selectedRecipe) {
    return (
      <div className="container">
        <div className="header">
          <h1>Our Cookbook</h1>
          <p>Maddie &amp; Connor&apos;s digital cookbook</p>
        </div>
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <button
              key={recipe.id}
              className="recipe-card"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="emoji">{recipe.emoji}</div>
              <h2>{recipe.title}</h2>
              <p className="desc">{recipe.description}</p>
              <div className="servings">{recipe.servings}</div>
            </button>
          ))}
        </div>
        <div className="footer">Made with love</div>
      </div>
    );
  }

  const recipe = selectedRecipe;

  return (
    <div className="container detail">
      <button className="back-btn" onClick={handleBack}>
        ← Back to recipes
      </button>
      <div className="detail-emoji">{recipe.emoji}</div>
      <h1>{recipe.title}</h1>
      <p className="desc">{recipe.description}</p>
      <div className="servings">{recipe.servings}</div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "steps" ? "active" : ""}`}
          onClick={() => setActiveTab("steps")}
        >
          Steps
        </button>
        <button
          className={`tab ${activeTab === "shopping" ? "active" : ""}`}
          onClick={() => setActiveTab("shopping")}
        >
          Shopping List
        </button>
        <button
          className="tab"
          onClick={clearProgress}
          style={{ marginLeft: "auto" }}
          aria-label="Clear progress"
        >
          🗑
        </button>
      </div>

      {activeTab === "steps" && (
        <>
          {recipe.sections.map((section, sIdx) => (
            <div className="section" key={sIdx}>
              <h3>{section.title}</h3>
              <ul className="step-list">
                {section.steps.map((step, stepIdx) => {
                  const isDone = completedSteps[`${sIdx}-${stepIdx}`];
                  return (
                    <li key={stepIdx}>
                      <button
                        className={`step-btn ${isDone ? "done" : ""}`}
                        onClick={() => toggleStep(sIdx, stepIdx)}
                      >
                        <span
                          className={`step-num ${isDone ? "completed" : "pending"}`}
                        >
                          {isDone ? "✓" : stepIdx + 1}
                        </span>
                        <span className="step-text">{step}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {recipe.assembly && (
            <div className="section">
              <h3>🍽 Assembly</h3>
              <ul className="step-list">
                {recipe.assembly.map((item, idx) => {
                  const key = `assembly-${idx}`;
                  const isDone = completedSteps[key];
                  return (
                    <li key={idx}>
                      <button
                        className={`step-btn ${isDone ? "done" : ""}`}
                        onClick={() =>
                          setCompletedSteps((prev) => ({
                            ...prev,
                            [key]: !prev[key],
                          }))
                        }
                      >
                        <span
                          className={`step-num ${isDone ? "completed" : "pending"}`}
                        >
                          {isDone ? "✓" : idx + 1}
                        </span>
                        <span className="step-text">{item}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}

      {activeTab === "shopping" && (
        <>
          {recipe.shoppingList.map((cat, catIdx) => (
            <div className="section" key={catIdx}>
              <h3>{cat.category}</h3>
              <ul className="step-list">
                {cat.items.map((item, itemIdx) => {
                  const isDone = checkedItems[`${catIdx}-${itemIdx}`];
                  return (
                    <li key={itemIdx}>
                      <button
                        className={`check-btn ${isDone ? "done" : ""}`}
                        onClick={() => toggleCheckItem(catIdx, itemIdx)}
                      >
                        <span
                          className={`checkbox ${isDone ? "checked" : ""}`}
                        >
                          {isDone ? "✓" : ""}
                        </span>
                        <span>{item}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </>
      )}

      <div className="footer">Made with love</div>
    </div>
  );
}
