"use client";

import { useState } from "react";
import { recipes } from "./recipes";

function RecipeCard({ recipe, onClick }) {
  return (
    <button className="recipe-card" onClick={onClick}>
      <div className="emoji">{recipe.emoji}</div>
      <h2>{recipe.title}</h2>
      <p className="desc">{recipe.description}</p>
      <div className="servings">{recipe.servings}</div>
    </button>
  );
}

function RecipeDetail({ recipe, onBack }) {
  const [completed, setCompleted] = useState(new Set());
  const [tab, setTab] = useState("steps");

  const toggle = (key) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <div className="container detail">
      <button className="back-btn" onClick={onBack}>
        &larr; Back to recipes
      </button>

      <div className="detail-emoji">{recipe.emoji}</div>
      <h1>{recipe.title}</h1>
      <p className="desc">{recipe.description}</p>
      <p className="servings">{recipe.servings}</p>

      <div className="tabs">
        <button
          className={`tab ${tab === "steps" ? "active" : ""}`}
          onClick={() => setTab("steps")}
        >
          Instructions
        </button>
        <button
          className={`tab ${tab === "shopping" ? "active" : ""}`}
          onClick={() => setTab("shopping")}
        >
          Shopping List
        </button>
      </div>

      {tab === "shopping" &&
        recipe.shoppingList.map((group) => (
          <div className="section" key={group.category}>
            <h3>{group.category}</h3>
            <ul className="step-list">
              {group.items.map((item) => {
                const key = `shop-${group.category}-${item}`;
                const done = completed.has(key);
                return (
                  <li key={item}>
                    <button
                      className={`check-btn ${done ? "done" : ""}`}
                      onClick={() => toggle(key)}
                    >
                      <span className={`checkbox ${done ? "checked" : ""}`}>
                        {done && "\u2713"}
                      </span>
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

      {tab === "steps" && (
        <>
          {recipe.sections.map((section) => (
            <div className="section" key={section.title}>
              <h3>{section.title}</h3>
              <ol className="step-list">
                {section.steps.map((step, i) => {
                  const key = `${section.title}-${i}`;
                  const done = completed.has(key);
                  return (
                    <li key={i}>
                      <button
                        className={`step-btn ${done ? "done" : ""}`}
                        onClick={() => toggle(key)}
                      >
                        <span
                          className={`step-num ${done ? "completed" : "pending"}`}
                        >
                          {done ? "\u2713" : i + 1}
                        </span>
                        <span className="step-text">{step}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}

          {recipe.assembly && (
            <div className="section">
              <h3>\ud83c\udf7d Assembly</h3>
              <ol className="step-list">
                {recipe.assembly.map((step, i) => {
                  const key = `assembly-${i}`;
                  const done = completed.has(key);
                  return (
                    <li key={i}>
                      <button
                        className={`step-btn ${done ? "done" : ""}`}
                        onClick={() => toggle(key)}
                      >
                        <span
                          className={`step-num ${done ? "completed" : "pending"}`}
                        >
                          {done ? "\u2713" : i + 1}
                        </span>
                        <span className="step-text">{step}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <RecipeDetail recipe={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Our Cookbook</h1>
        <p>Maddie &amp; Connor&apos;s favorite recipes</p>
      </div>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => setSelected(recipe)}
          />
        ))}
      </div>

      <div className="footer">Made with love</div>
    </div>
  );
}
